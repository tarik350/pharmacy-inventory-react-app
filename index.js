function utf8BitLength(char) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(char);
  return encoded.length * 8;
}

console.log(utf8BitLength("A")); // 8 bits
console.log(utf8BitLength("ላ")); // 32 bits
console.log(utf8BitLength("p"));
console.log(utf8BitLength("🇺🇸"));
