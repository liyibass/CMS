// const { access } = require('./Permission.js');
const { Text, DateTime } = require('@keystonejs/fields')
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce')

const editorConfig = {
  selector: 'textarea',
  height: 400,
  toolbar_mode: 'wrap',

  plugins: [
    'advlist autolink link image lists charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
    'table emoticons template paste help',
  ],
  toolbar:
    'fullscreen | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist outdent indent | link image imagetools |  preview media fullpage | ' +
    'blockquote annotation forecolor backcolor  wordcount',
  menu: {
    favs: {
      title: 'My Favorites',
      items: 'code visualaid | searchreplace | emoticons',
    },
  },
  menubar: 'favs file edit view insert format tools table help',

  imagetools_cors_hosts: ['mydomain.com', 'otherdomain.com'],
  imagetools_proxy: 'proxy.php',
}

module.exports = {
  fields: {
    title: {
      label: '標題',
      type: Text,
      isRequired: true,
      schemaDoc: 'This is the thing you need to do',
    },
    text: { label: '文章', type: Wysiwyg, editorConfig: editorConfig },
  },
}
