import NoFileImage from '../../images/file.svg';

// render image helper function

export function renderImage(file) {
  switch (file.mimetype) {
    case 'image/jpeg':
      return file.thumb_480 || file.thumb_360;
    case 'image/png':
      return file.thumb_480 || file.thumb_360;
    case 'image/svg+xml':
      return file.url_private;
    case 'image/gif':
      return file.thumb_360_gif;
    default:
      return NoFileImage;
  }
}