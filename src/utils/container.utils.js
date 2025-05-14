const getContainerId = () => {
    return process.env.HOSTNAME || 'local';
};

module.exports = {
    getContainerId
};