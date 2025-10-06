function hasUserMention(text: String) {
  return /<@!?\d+>/.test(text as string);
}

export default hasUserMention;
