module.exports = (res) => err => {
    const errorData = process.env.NODE_ENV !== 'prod' ? err : 'an error occurred';

    res.status(err.status || 500).json({ok: false, error: true, data: errorData});
};
