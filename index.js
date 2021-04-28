

const Player = (username, mark) => {
    const getUsername = () => username;
    const getMark = () => mark;
    return { getUsername, getMark }
}