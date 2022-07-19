// TODO: improve getUid function.
// maybe use uuid library
const getUid = () => String(Math.floor(Math.random() * Date.now()));

export default getUid;
