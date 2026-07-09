const readAllComments = async (req, res) => {
    res.json({
        testComment: "on readAllComments"
    });
};

const readComment = async (req, res) => {
    res.json({
        testComment: "on readComment"
    });
};

const createComment = async (req, res) => {
    res.json({
        testComment: "on createComment"
    });
};

const updateComment = async (req, res) => {
    res.json({
        testComment: "on updateComment"
    });
};

const deleteComment = async (req, res) => {
    res.json({
        testComment: "on deleteComment"
    });
};

module.exports = {
  readAllComments,
  readComment,
  createComment,
  updateComment,
  deleteComment,
};
