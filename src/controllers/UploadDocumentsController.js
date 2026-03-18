const path = require("path");
const UserRepository = require("../repositories/UserRepository");

async function uploadFile(req, res) {
  try {
    const { id } = req.params;
    const user = UserRepository.findById(id);

    let baseDocs = user.documents || [];
    if (req.body.documents !== undefined) {
      try {
        baseDocs = JSON.parse(req.body.documents);
        if (!Array.isArray(baseDocs)) baseDocs = [];
      } catch {
        return res.status(400).json({ message: "Campo 'documents' deve ser um array JSON válido" });
      }
    }

    let updatedData = {};
    let fileUrl = null;

    if (req.file) {
      const isImage = req.file.mimetype.startsWith("image/");
      const folder = isImage ? "images" : "documents";
      fileUrl = `/uploads/${folder}/${req.file.filename}`;

      if (isImage) {
        updatedData.photo = fileUrl;
      } else {
        updatedData.documents = [...baseDocs, fileUrl];
      }
    } else {
      updatedData.documents = baseDocs;
    }

    UserRepository.updateUser({ ...user, ...updatedData });

    return res.status(200).json({
      message: "Atualizado com sucesso",
      ...(fileUrl && { url: fileUrl }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { uploadFile };