export default function convertToUrl(title) {
  // Chuyển toàn bộ title về chữ thường
  let slug = title?.toLowerCase()

  // Thay thế các ký tự tiếng Việt thành các ký tự không dấu
  slug = slug
    ?.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, "a")
    .replace(/[éèẻẽẹêếềểễệ]/g, "e")
    .replace(/[iíìỉĩị]/g, "i")
    .replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o")
    .replace(/[úùủũụưứừửữự]/g, "u")
    .replace(/[ýỳỷỹỵ]/g, "y")
    .replace(/đ/g, "d")

  // Loại bỏ các ký tự đặc biệt, dấu câu, dấu chấm câu và khoảng trắng thừa
  slug = slug
    ?.replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s/g, "-")

  // // Loại bỏ các từ ngữ bị cấm
  // const bannedWords = [
  //     'a',
  //     'an',
  //     'the',
  //     'and',
  //     'but',
  //     'or',
  //     'for',
  //     'nor',
  //     'on',
  //     'at',
  //     'to',
  //     'from',
  //     'by',
  //     'of',
  //     'in',
  //     'out',
  //     'off',
  //     'up',
  //     'down',
  //     'over',
  //     'with',
  //     'after',
  //     'before',
  //     'during',
  //     'under',
  //     'till',
  //     'than',
  //     'like',
  //     'as',
  // ]
  // bannedWords.forEach((word) => {
  //     const regex = new RegExp(`\\b${word}\\b`, 'gi')
  //     slug = slug.replace(regex, '')
  // })

  // // Loại bỏ số thứ tự và các ký tự giống nhau liên tiếp
  // slug = slug.replace(/\d+/g, '').replace(/(.)\1+/g, '$1')

  // // Cắt độ dài URL tối đa là 70 ký tự
  // slug = slug.substring(0, 70)

  // Loại bỏ ký tự gạch ngang (-) cuối cùng
  if (slug?.charAt(slug?.length - 1) === "-") {
    slug = slug?.slice(0, -1)
  }

  return slug
}
