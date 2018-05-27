displayResponse = (data) => {
    const text = data.responses[0].textAnnotations[0].description;
    console.log(data, text);

    this.setState({ data, text });
    this.props.fillQuoteText(text)
}
