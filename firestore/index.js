// index.js
const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('./permissions.json');

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://temukand-d8854.appspot.com`);

async function uploadFile(path, filename) {

    // Upload the File
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `/uploads/hashnode/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });


    return storage[0].metadata.mediaLink;
}

(async() => {
    const url = await uploadFile('./mypic.png', "my-image.png");
    console.log(url);
})();
