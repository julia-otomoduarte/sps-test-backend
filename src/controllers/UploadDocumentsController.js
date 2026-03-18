const path = require("path");
const UserRepository = require("../repositories/UserRepository");

async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado" });
    }

    const { id } = req.params;
    const user = UserRepository.findById(id);

    const isImage = req.file.mimetype.startsWith("image/");
    const folder = isImage ? "images" : "documents";
    const fileUrl = `/uploads/${folder}/${req.file.filename}`;

    const field = isImage ? "photo" : "documents";

    let updatedData = {};
    if (field === "documents") {
      const currentDocs = user.documents || [];
      updatedData.documents = [...currentDocs, fileUrl];
    } else {
      updatedData.photo = fileUrl;
    }

    UserRepository.updateUser({ ...user, ...updatedData });

    return res.status(200).json({
      message: "Arquivo salvo com sucesso",
      url: fileUrl,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { uploadFile };