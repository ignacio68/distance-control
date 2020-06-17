import BitmapFactory, { IPoint2D, ISize } from 'nativescript-bitmap-factory'
import { ImageSource } from "@nativescript/core/image-source"
import { Folder, path, knownFolders } from '@nativescript/core/file-system'

export interface CropImage {
  leftTop: IPoint2D
  size: ISize
  resize?: ISize
}

export const loadImage = (filePath: string): ImageSource => {
  const folder: Folder = knownFolders.currentApp()
  const folderPath: string = path.join(folder.path, filePath)
  const imageFromLocalFile: ImageSource = ImageSource.fromFileSync(folderPath)
  return imageFromLocalFile
}

export const createThumbFromImage = (filePath: string, options: CropImage) => {
  const imageSource = loadImage(filePath)
  const mutable = BitmapFactory.makeMutable(imageSource)
  const createdImage = BitmapFactory.asBitmap(mutable).dispose(bmp => {
    const cropImage = bmp.crop(options.leftTop, options.size)
    const resizeImage = cropImage.resize(options.resize)
    return resizeImage
  })
  const newImage = createdImage.toImageSource()
  return newImage
}
