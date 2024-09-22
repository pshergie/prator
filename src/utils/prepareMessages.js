import shouldMessageBePosted from "./shouldMessageBePosted.js"

const prepareMessages = ((config, comments, diff, messagesToPost = []) => {
  let paths;
  const _messagesToPost = messagesToPost;

  if (config.paths === 'string') {
    paths = [config.paths];
  } else if (Array.isArray(config.paths) && config.paths.length > 0) {
    paths = config.paths;
  } else {
    console.error('"paths" should be either string or array:', config.paths, 'type:', typeof config.paths);
    return;
  }

  paths.map(path => {
    if (shouldMessageBePosted(path, message, diff, comments, _messagesToPost)) {
      _messagesToPost.push(message);
    }
  })

  return _messagesToPost;
})

export default prepareMessages;
