exports.list = async (req,res) => {
    res.status(200).json({
        msg:'/video-list'
    })
}

exports.delete = async (req,res) => {
    res.status(200).json({
        msg:'Delete Success'
    })
}