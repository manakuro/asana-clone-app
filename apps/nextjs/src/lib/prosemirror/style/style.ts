export const proseMirrorStyle = () => ({
  '.ProseMirror ul, .ProseMirror ol': {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: '32px',
  },
  '.ProseMirror ul': {
    listStyleType: 'disc !important',
  },
  '.ProseMirror ol': {
    listStyleType: 'decimal !important',
  },
  '.ProseMirror ul ul': {
    listStyleType: 'circle !important',
  },
  '.ProseMirror li': {
    listStyleType: 'inherit !important',
  },
  '.ProseMirror p': {
    fontSize: '14px',
  },
  '.ProseMirror-selectednode': {
    outline: '0 !important',
  },
});
