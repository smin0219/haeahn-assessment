function Question(
    id = "",
    media = "",
    content = "",
    choices = [],
) {
    return {
        id: id,
        media: media,
        content: content,
        choices: choices,
    };
}
export default Question;