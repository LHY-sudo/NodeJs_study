exports.list = async (req,res) => {
    res.status(200).json({
        msg:'/video-list'
    })
}

exports.users = async (req,res) => {
    res.status(200).json({
        msg:'/users'
    })
}