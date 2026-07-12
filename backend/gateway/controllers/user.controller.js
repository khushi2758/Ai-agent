export const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({  // 200 = ok
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
