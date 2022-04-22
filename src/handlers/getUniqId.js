const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => (с == 'x' ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16));

export default uuid;
