import { fromByteArray, toByteArray } from "base64-js";
export function base64Decode(str) {
    var unevenBytes = str.length % 4;
    var strToDecode;
    if (unevenBytes != 0) {
        var paddingNeeded = 4 - unevenBytes;
        strToDecode = str + "=".repeat(paddingNeeded);
    }
    else {
        strToDecode = str;
    }
    var bytes = toByteArray(strToDecode);
    return utf8Slice(bytes, 0, bytes.length);
}
export function base64Encode(str) {
    var result;
    if ("undefined" === typeof Uint8Array) {
        result = utf8ToBytes(str);
    }
    result = new Uint8Array(utf8ToBytes(str));
    return fromByteArray(result);
}
function utf8ToBytes(string) {
    var units = Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    var i = 0;
    for (; i < length; i++) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 0xd7ff && codePoint < 0xe000) {
            if (leadSurrogate) {
                if (codePoint < 0xdc00) {
                    if ((units -= 3) > -1) {
                        bytes.push(0xef, 0xbf, 0xbd);
                    }
                    leadSurrogate = codePoint;
                    continue;
                }
                else {
                    codePoint =
                        ((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00) | 0x10000;
                    leadSurrogate = null;
                }
            }
            else {
                if (codePoint > 0xdbff) {
                    if ((units -= 3) > -1) {
                        bytes.push(0xef, 0xbf, 0xbd);
                    }
                    continue;
                }
                else if (i + 1 === length) {
                    if ((units -= 3) > -1) {
                        bytes.push(0xef, 0xbf, 0xbd);
                    }
                    continue;
                }
                else {
                    leadSurrogate = codePoint;
                    continue;
                }
            }
        }
        else if (leadSurrogate) {
            if ((units -= 3) > -1) {
                bytes.push(0xef, 0xbf, 0xbd);
            }
            leadSurrogate = null;
        }
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) {
                break;
            }
            bytes.push(codePoint);
        }
        else if (codePoint < 0x800) {
            if ((units -= 2) < 0) {
                break;
            }
            bytes.push((codePoint >> 0x6) | 0xc0, (codePoint & 0x3f) | 0x80);
        }
        else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) {
                break;
            }
            bytes.push((codePoint >> 0xc) | 0xe0, ((codePoint >> 0x6) & 0x3f) | 0x80, (codePoint & 0x3f) | 0x80);
        }
        else if (codePoint < 0x200000) {
            if ((units -= 4) < 0) {
                break;
            }
            bytes.push((codePoint >> 0x12) | 0xf0, ((codePoint >> 0xc) & 0x3f) | 0x80, ((codePoint >> 0x6) & 0x3f) | 0x80, (codePoint & 0x3f) | 0x80);
        }
        else {
            throw new Error("Invalid code point");
        }
    }
    return bytes;
}
export function utf8Slice(buf, start, end) {
    var res = "";
    var tmp = "";
    end = Math.min(buf.length, end || Infinity);
    start = start || 0;
    for (var i = start; i < end; i++) {
        if (buf[i] <= 0x7f) {
            res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
            tmp = "";
        }
        else {
            tmp += "%" + buf[i].toString(16);
        }
    }
    return res + decodeUtf8Char(tmp);
}
function decodeUtf8Char(str) {
    try {
        return decodeURIComponent(str);
    }
    catch (err) {
        return String.fromCharCode(0xfffd);
    }
}
//# sourceMappingURL=Base64.js.map