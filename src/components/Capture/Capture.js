import React from 'react';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import CaptureIcon from 'material-ui/svg-icons/image/add-a-photo';
import { getBase64, getImageDimension } from 'lib/base64';
import recognizeText, { mapResponse } from 'api/vision';
// eslint-disable-next-line
import baseMock from './base64';
// eslint-disable-next-line
import dataMock from './mock';
import { drawRectangle } from './canvas';
import './index.css';
export default class Capture extends React.Component {
    constructor() {
		super();
		this.state = {
            data: {},
            base64: null,
            fetching: false,
            scale: 1,
            words: [],
            indexStart: null,
            notification: {
                open: false,
                text: '',
            }
        }
    }

    handleImageChange = async ({ target: { files } }) => {
        const base64 = await getBase64(files[0]);
        const { width, height } = await getImageDimension(files[0]);

        this.setState({
            base64, width, height,
            scale: this.image.offsetWidth / width,
        });

        this.resetCanvas();
        this.toggleFetching();

        recognizeText(base64)
            .then((data) => mapResponse(data, this.state.scale))
            .then((words) => {
                // words.forEach(({ boundingPoly: { vertices } }) =>
                    // drawRectangle(this.canvas, vertices, 3, '#00bcd4'))
                this.setState({ words });
            })
            .finally(this.toggleFetching)
    }

    handleCanvasClick = ({ clientX, clientY, pageX, pageY }) => {
        const { top: canvasTop, left: canvasLeft } = this.canvas.getBoundingClientRect();
        const canvasCoords = {
            x: clientX - canvasLeft,
            y: clientY - canvasTop,
        }

        const findMatchingWord = (cords) =>
            ({ boundingPoly: { vertices }, description }) =>
                vertices[0].x < cords.x &&
                vertices[1].x > cords.x &&
                vertices[0].y < cords.y &&
                vertices[2].y > cords.y

        const index = this.state.words.findIndex(findMatchingWord(canvasCoords));

        if (index > -1) {
            if (this.state.indexStart !== null) {
                const words = this.state.words
                    .slice(this.state.indexStart, index + 1);

                const concatWords = () =>
                    words.map(({ description }) => description)
                        .reduce((acc, next) =>
                            acc.slice(-1) === '-' ?
                                acc.slice(0, -1).concat(next) :
                                acc.length ? [acc, next].join(' ') : next, '');


                // draw second rect
                drawRectangle(this.canvas, this.state.words[index].boundingPoly.vertices, 3, '#00bcd4', '#00bcd47d');

                // draw between rects
                words.forEach(({ boundingPoly: { vertices } }) =>
                    drawRectangle(this.canvas, vertices, 3, '#00bcd4', '#00bcd47d'))


                setTimeout(this.resetCanvas, 1000)

                const text = concatWords();
                this.props.fillQuoteText(text);
                this.setState({
                    notification: {
                        open: true,
                        text: text.length ? 'Text copied to form' : 'Could not extract text',
                    }
                })

                return;
            }

            if (!this.state.indexStart) {
                this.setState({ indexStart: index });
                drawRectangle(this.canvas, this.state.words[index].boundingPoly.vertices, 3, '#00bcd4', '#00bcd47d');
            }
        }
    }

    resetCanvas = () => {
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.state.words
        //     .forEach(({ boundingPoly: { vertices } }) =>
        //         drawRectangle(this.canvas, vertices, 3, '#00bcd4'))
        this.setState({
            indexStart: null,
        })
    }

    toggleFetching = () =>
        this.setState({ fetching: !this.state.fetching });

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '5px' }}>
                    {/* <label htmlFor="inputFile">Scan text from photo</label> */}
                    <RaisedButton
                        onClick={() => this.file.click()}
                        labelPosition="before"
                        label="Scan text from photo"
                        secondary={true}
                        fullWidth
                        icon={!this.state.fetching ? < CaptureIcon/> : <CircularProgress size={30} />}
                    >
                        <input type="file"
                            id="inputFile"
                            className="input-file"
                            ref={(dom) => this.file = dom}
                            accept="image/*"
                            onChange={this.handleImageChange}/>
                    </ RaisedButton>
                </div>
                <div style={{position: 'relative', padding: '0 10px 10px', maxWidth: 'var(--app-max-width)'}}>
                    {this.state.width ?
                        <p>To extract text, tap at the image on starting and ending word.</p> : ''}
                    <img
                        ref={(image) => this.image = image}
                        src={this.state.base64}
                        className="capture-image"
                        style={{ position: 'absolute', zIndex: '-1' }}/>
                    {this.state.width &&
                        <canvas
                            onClick={this.handleCanvasClick}
                            ref={(canvas) => this.canvas = canvas}
                            width={this.image.offsetWidth} height={this.image.offsetHeight}
                        />
                        }
                </div>
                <Snackbar
                    open={this.state.notification.open}
                    message={this.state.notification.text}
                    autoHideDuration={3000}
                    action="show"
                    onActionTouchTap={() => window.scrollTo(0, 0)}
                    onRequestClose={() => this.setState({
                        notification: { text: '', open: false }
                    })}
                />
            </div>
        )
    }
}
