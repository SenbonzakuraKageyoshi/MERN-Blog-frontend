export const removePost = (arr, id) => {
    const result = [...arr.filter((item) => id !== item._id)];
    console.log(result);
};