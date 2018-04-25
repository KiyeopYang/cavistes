import rmdir from 'rimraf';

export const IMAGE_PATH = 'public/';

function removeFile(dirToDelete) {
  return new Promise((resolve, reject) => {
    rmdir(`${IMAGE_PATH}${dirToDelete}`, function(error) {
      console.log(dirToDelete);
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

export async function remove(fileDirId) {
  if (Array.isArray(fileDirId)) {
    await Promise.all(fileDirId.map(removeFile));
  } else {
    await removeFile(fileDirId);
  }
}
