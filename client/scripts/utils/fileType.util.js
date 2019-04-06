import Folder from '@material-ui/icons/Delete';
import Notes from '@material-ui/icons/Notes';
import Image from '@material-ui/icons/Image';
import MovieFilter from '@material-ui/icons/MovieFilter';
import FontDownloadRounded from '@material-ui/icons/FontDownloadRounded';
import Tv from '@material-ui/icons/Tv';
import InsertLink from '@material-ui/icons/InsertLink';

import React from 'react';

export const detectFileType = (fileType) => {

  const notes = ['c', 'csharp', 'css', 'dart', 'haskell', 'fortran', 'go', 'groovy', 'latex', 'kotlin', 'java', 'markdown', 'odt', 'php', 'python', 'sass', 'smalltalk', 'shell', 'swift', 'tsv', 'vb', 'vbscript', 'xml', 'yaml', 'text', 'javascript', 'html', 'mhtml', 'doc', 'docx', 'powershell', 'applescript', 'dockerfile', 'dotx', 'email', 'eps', 'epub', 'erlang'];
  const files = ['zip', 'tar', 'pdf', 'gzip', 'apk', 'binary', 'bmp'];
  const excels = ['csv', 'xltx', 'xlsm', 'xlsb', 'xlsx', 'xls', 'odd', 'gsheet', 'gdraw', 'gdoc'];
  const videos = ['m4a', 'wmv', 'webm', 'wav', 'verilog', 'velocity', 'vcard', 'ogv', 'mp3', 'mp4', 'mpg', 'mov', 'mkv', 'flv'];
  const photos = ['ai', 'gif', 'tiff', 'odg', 'svg', 'sketch', 'psd', 'png', 'jpg', 'odi'];
  const presentations = ['ppt', 'pptx', 'odp', 'gpres'];

  if (notes.includes(fileType)) {
    return { cssType: 'notes', icon: (<Notes/>) };
  } else if (files.includes(fileType)) {
    return { cssType: 'files', icon: (<Folder/>) };
  } else if (excels.includes(fileType)) {
    return { cssType: 'excels', icon: (<FontDownloadRounded/>) };
  } else if (videos.includes(fileType)) {
    return { cssType: 'videos', icon: (<MovieFilter/>) };
  } else if (photos.includes(fileType)) {
    return { cssType: 'photos', icon: (<Image/>) };
  } else if (presentations.includes(fileType)) {
    return { cssType: 'presentations', icon: (<Tv/>) };
  } else {
    return { cssType: 'default', icon: (<InsertLink/>) };
  }
};

export const detectColor = (avatarCssType, classes) => {

  if (avatarCssType === 'notes') {
    return classes.notes;
  } else if (avatarCssType === 'files') {
    return classes.files;
  } else if (avatarCssType === 'excels') {
    return classes.excels;
  } else if (avatarCssType === 'videos') {
    return classes.videos;
  } else if (avatarCssType === 'photos') {
    return classes.photos;
  } else if (avatarCssType === 'presentations') {
    return classes.presentations;
  } else {
    return classes.avatar;
  }
};
