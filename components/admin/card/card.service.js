const Card = require('../../../models/Card');
//connect firebase
const admin = require('firebase-admin');
const serviceAccount = require('../../../config/fireBaseConfig.json'); // Thay đổi đường dẫn đến tệp cấu hình

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://wibuteam-8d09e.appspot.com' // Thay đổi URL bucket của Firebase Storage
});
const bucket = admin.storage().bucket();
exports.uploadCard = (file) => {
    return new Promise((resolve, reject) => {
      try {
        const filepath = file.fieldname + '/' + file.originalname;
        const blob = bucket.file(filepath);
        const blobStream = blob.createWriteStream({
          resumable: false,
          metadata: {
            contentType: file.mimetype,
          },
        });
  
        blobStream.on('error', err => {
          console.error(err);
          reject('Error uploading file.');
        });
  
        blobStream.on('finish', () => {
          blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2024'
          }, (err, signedUrl) => {
            if (err) {
              console.error('Error getting signed URL:', err);
              reject('Error getting file URL.');
            }
            console.log('File uploaded successfully.');
            resolve(signedUrl);
          });
        });
  
        blobStream.end(file.buffer);
      } catch (error) {
        console.error(error);
        reject('Error during file upload.');
      }
    });
  };

  exports.updateCard = async (cardInfo, imageUrl) => {
    try {
      // Cập nhật thông tin thẻ và hình ảnh mới
      const updatedCard = await Card.findOneAndUpdate(
        { id: cardInfo.id }, // Điều kiện tìm thẻ cần cập nhật (thay id bằng trường khóa chính của thẻ)
        { $set: { 
          name: cardInfo.name,
          rarity: cardInfo.rarity,
          image: imageUrl,
          setId: cardInfo.setId,
          updatedAt: new Date(),
          types: cardInfo.types,
          marketPrices: cardInfo.price,
          timestamp: new Date().timestamp,
          amount: cardInfo.amount
         } }, // Dữ liệu cần cập nhật
        { new: true } // Trả về thẻ đã cập nhật (nếu không có sẽ trả về thẻ trước khi cập nhật)
      );
  
      // Nếu bạn muốn trả về thông tin thẻ đã cập nhật
      return updatedCard;
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error updating card:', error);
      throw new Error('Error updating card.');
    }
  };

exports.GetAllCards = async () => {
  try {
    const card = await Card.find();
    return card;
  } catch (error) {
    throw new Error(
      "Error fetching filtered products from database: " + error.message
    );
  }
};


exports.GetCard = async (id) => {
  const card = await Card.findOne({ id: id });
  return card;
}
