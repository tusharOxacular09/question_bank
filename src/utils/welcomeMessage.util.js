export const welcomeMessage = (req, res) => {
  return res.status(200).json({
    success: true,
    message:
      "🚀 Welcome to Question Bank! Let's connect and share great ideas! 🚀",
  });
};
