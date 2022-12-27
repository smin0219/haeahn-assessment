function Question(
    id = "",
    number = "",
    image = "",
    contents = "",
    choices = [],
) {
    return {
        id: id,
        number: number,
        image: image,
        contents: contents,
        choices: choices
    };
}
export default Question;