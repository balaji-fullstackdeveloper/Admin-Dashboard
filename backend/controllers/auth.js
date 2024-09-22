export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");
    if (!user.password) return res.status(400).json("Password is required");
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(404).json("Password is incorrect");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    if (!token) return res.status(500).json("Failed to generate token");
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true });
    res.status(200).json("Logged out");
  } catch (err) {
    res.status(500).json(err);
  }
};
