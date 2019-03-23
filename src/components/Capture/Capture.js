import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import CaptureIcon from 'material-ui/svg-icons/image/add-a-photo';
import { getBase64, getImageDimension } from 'lib/base64';
import { drawRectangle } from 'lib/canvas';
import recognizeText, { mapResponse } from 'api/vision';

const imgStyles = {
  width: 'calc(100vw - 2 * var(--app-padding))',
  maxWidth: 'var(--app-max-width)',
};

const canvasStyles = {
  position: 'absolute',
  zIndex: '1',
  left: 0,
};

const imgSectionStyles = {
  position: 'relative',
  maxWidth: 'var(--app-max-width)',
};

export default class Capture extends React.Component {
    state = {
      base64: null,
      fetching: false,
      scale: 1,
      words: [],
      indexStart: null,
      notification: {
        open: false,
        text: '',
      },
    };

    handleImageChange = async ({ target: { files } }) => {
      const base64 = await getBase64(files[0]);
      const { width } = await getImageDimension(files[0]);

      this.setState({
        base64,
        width,
        scale: this.image.offsetWidth / width,
      });

      this.resetCanvas();
      this.toggleFetching();

      recognizeText(base64)
        .then((data) => {
          console.log(data);
          return data;
        })
        .then(data => mapResponse(data, this.state.scale))
        .then((words) => {
          // words.forEach(({ boundingPoly: { vertices } }) =>
          // drawRectangle(this.canvas, vertices, 3, '#00bcd4'))
          this.setState({ words });
        })
        .finally(this.toggleFetching);
    }

    handleCanvasClick = ({
      clientX, clientY,
    }) => {
      const { top: canvasTop, left: canvasLeft } = this.canvas.getBoundingClientRect();
      const canvasCoords = {
        x: clientX - canvasLeft,
        y: clientY - canvasTop,
      };

      const findMatchingWord = cords =>
        ({ boundingPoly: { vertices } }) =>
          vertices[0].x < cords.x &&
                vertices[1].x > cords.x &&
                vertices[0].y < cords.y &&
                vertices[2].y > cords.y;

      const index = this.state.words.findIndex(findMatchingWord(canvasCoords));

      if (index > -1) {
        if (this.state.indexStart !== null) {
          const words = this.state.words
            .slice(this.state.indexStart, index + 1);

          const concatWords = () =>
            words.map(({ description }) => description)
              .reduce((acc, next) => {
                if (acc.slice(-1) === '-') {
                  return acc.slice(0, -1).concat(next);
                }
                if (acc.length) {
                  return [acc, next].join(' ');
                }
                return next;
              }, '');


          // draw second rect
          drawRectangle(this.canvas, this.state.words[index].boundingPoly.vertices, 3, '#00bcd4', '#00bcd47d');

          // draw between rects
          words.forEach(({ boundingPoly: { vertices } }) =>
            drawRectangle(this.canvas, vertices, 3, '#00bcd4', '#00bcd47d'));


          setTimeout(this.resetCanvas, 1000);

          const text = concatWords();
          this.props.fillQuoteText(text);
          this.setState({
            notification: {
              open: true,
              text: text.length ? 'Text copied' : 'Text not found',
            },
          });

          return;
        }

        if (!this.state.indexStart) {
          this.setState({ indexStart: index });
          drawRectangle(this.canvas, this.state.words[index].boundingPoly.vertices, 3, '#00bcd4', '#00bcd47d');
        }
      }
    }

    resetCanvas = () => {
      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.state.words
      //     .forEach(({ boundingPoly: { vertices } }) =>
      //         drawRectangle(this.canvas, vertices, 3, '#00bcd4'))
      this.setState({
        indexStart: null,
      });
    }

    toggleFetching = () =>
      this.setState({ fetching: !this.state.fetching });

    render() {
      return (
        <div style={{ marginTop: '10px' }}>
          <RaisedButton
            onClick={() => this.file.click()}
            labelPosition="before"
            label="Scan text from photo"
            secondary
            fullWidth
            icon={!this.state.fetching ? <CaptureIcon /> : <CircularProgress size={30} />}
          >
            <input
              type="file"
              id="inputFile"
              style={{ display: 'none' }}
              ref={(dom) => { this.file = dom; }}
              accept="image/*"
              onChange={this.handleImageChange}
            />
          </RaisedButton>
          <Snackbar
            open={this.state.notification.open}
            message={this.state.notification.text}
            autoHideDuration={3000}
            action="show"
            onActionClick={() => window.scrollTo(0, 0)}
            onRequestClose={() => this.setState({
                        notification: { text: '', open: false },
                    })}
          />
          <section style={imgSectionStyles}>
            {this.state.width ?
              <p>To extract text, tap at the image on starting and ending word.</p> : ''}
            <img
              alt=""
              ref={(image) => { this.image = image; }}
              src={this.state.base64}
              style={imgStyles}
            />
            {this.state.width &&
              <canvas
                style={canvasStyles}
                onClick={this.handleCanvasClick}
                ref={(canvas) => { this.canvas = canvas; }}
                width={this.image.offsetWidth}
                height={this.image.offsetHeight}
              />
            }
          </section>
        </div>
      );
    }
}
