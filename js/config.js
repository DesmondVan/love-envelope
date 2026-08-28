/* ============================================================
   ⭐ CONFIG.JS — FILE CẤU HÌNH — BẠN SỬA Ở ĐÂY
   ============================================================
   Hướng dẫn:
   - Sửa nội dung bên dưới để cá nhân hóa website
   - Không cần biết code, chỉ cần sửa text trong dấu "..."
   - Lưu file → Mở lại index.html trên trình duyệt → Xong!
   ============================================================ */

const CONFIG = {

  // ─────────────────────────────────────────────
  // 🔐 MÀN 1: MẬT KHẨU
  // ─────────────────────────────────────────────
  password: "phương trinh",           // Mật khẩu (viết thường, hệ thống tự bỏ dấu nếu cần)
  passwordHint: "Hãy cho anh biết tên em 💕",  // Gợi ý hiển thị

  // ─────────────────────────────────────────────
  // 💕 THÔNG TIN CHUNG
  // ─────────────────────────────────────────────
  herName: "Ỉn",                      // Nickname bạn gái
  startDate: "2024-08-29",            // Ngày bắt đầu yêu (YYYY-MM-DD)

  // ─────────────────────────────────────────────
  // 💌 MÀN 2: CÂU THẢ THÍNH IT
  // ─────────────────────────────────────────────
  pickupLines: [
    "Em có lẽ là một hoạ sĩ, nếu không cớ sao gặp em đời anh đầy sắc màu 🌈",
    "Anh luôn kiên định, nhưng em làm anh xiêu lòng rồi 😍",
    "Em như file cookie — cứ mãi lưu giữ hình bóng em trong anh 🍪",
    "Anh đã dùng mọi thuật toán, kết quả trả về luôn là: Yêu em 💖",
    "Nếu anh có thư viện, em hẳn là thủ thư sắp xếp tình cảm anh trong đó 🔍",
  ],

  // ─────────────────────────────────────────────
  // ✍️ MÀN 3: THƯ TÌNH — 4 GIAI ĐOẠN
  // ─────────────────────────────────────────────
  // 📝 SỬA NỘI DUNG Ở ĐÂY! Thay text trong "..." bằng lời của bạn.
  // 📸 ẢNH: Đặt ảnh vào folder assets/images/ với tên tương ứng.
  chapters: [
    {
      // ── Giai đoạn 1 ──
      title: "🌱 Lần Đầu Gặp Nhau",
      image: "assets/images/chapter1.jpg",   // 📸 ẢNH: Đổi tên file nếu cần
      text: "Ỉn ơi, em còn nhớ lần đầu mình gặp nhau không?\n\nNgày đó đôi ta còn xa lạ, anh không có cuộc trò chuyện ra hồn nào với em. Trong nhóm bạn cũ, có thể với ai anh cũng nói chuyện được. Nhưng nếu thiếu em, anh sẽ luôn thắc mắc hỏi em đâu? Anh không biết lúc đó liệu anh có cảm mến với em không, nhưng anh đã luôn dõi theo em từ rất lâu.\n\nTừ khi đôi ta yêu nhau, anh cảm thấy thật may mắn khi gặp một người hiền lành, tốt bụng như em. Cô gái trước đây anh ganh ghét về các môn học xã hội, giờ đây lại sát cánh bên anh. Em nói yêu anh, anh hạnh phúc vì điều đó, một tình yêu học trò.",
      effect: "sakura",                      // Hiệu ứng: hoa anh đào rơi
      gradient: ["#FFF0F5", "#FFFFFF"],      // Gradient: hồng nhạt → trắng
    },
    {
      // ── Giai đoạn 2 ──
      title: "💬 Những Ngày Quen Nhau",
      image: "assets/images/chapter2.jpg",   // 📸 ẢNH: Đổi tên file nếu cần
      text: "Một năm trải qua với bao nhiêu thăng trầm, những gì trải qua năm cuối cấp 3 khiến anh không thể nào quên. Những tình cảm, cảm xúc lúc ấy anh thật sự rất bồi hồi khi nghĩ lại.\n\nMột năm tuy nhiều biến động, có những lúc tranh cãi, hay những lúc ôm chằm nhau mà khóc, anh vẫn luôn nhớ mãi.\n\nTuy không có kỉ niệm 1 năm trọn vẹn, anh vẫn luôn giữ mãi tấm lòng nhiệt thành yêu em. Nhiều lúc thấy anh như thằng ngốc, nhưng anh không ngại vì những điều đó. Bởi lẽ làm vậy anh mới cho em thấy anh yêu em nhường nào.",
      effect: "bubbles",                     // Hiệu ứng: bong bóng bay
      gradient: ["#FFDAB9", "#E8D5F5"],      // Gradient: peach → lavender
    },
    {
      // ── Giai đoạn 3 ──
      title: "💕 Khi Anh Nhận Ra",
      image: "assets/images/chapter3.jpg",   // 📸 ẢNH: Đổi tên file nếu cần
      text: "Rồi đến được ngày hôm nay, anh thầm cảm ơn em vì đã luôn nhẫn nhịn, chịu đựng và đợi chờ anh. Đôi ta tuy vẫn còn nhiều khuyết điểm, nhưng vẫn dành thời gian cho nhau để thấu hiểu và giữ lửa quan hệ.\n\nCảm ơn em, Lê Ngô Phương Trinh. Anh mong đôi ta sẽ luôn đồng hành cùng nhau trong tương lai.\n\nEm chính là lý do để cho anh muốn trở thành phiên bản tốt hơn của bản thân mình.",
      effect: "hearts",                      // Hiệu ứng: tim bay lên
      gradient: ["#FFB3D9", "#FF85C0"],      // Gradient: rose → pink đậm
    },
    {
      // ── Giai đoạn 4 ──
      title: "💖 Lời Muốn Nói",
      image: "assets/images/chapter4.jpg",   // 📸 ẢNH: Đổi tên file nếu cần
      text: "Ỉn à, anh viết những dòng này không phải vì anh giỏi văn hay biết nói lời hay.\n\nAnh viết vì anh muốn em biết rằng — em rất quan trọng với anh.\n\nAnh muốn được ở bên em, chăm sóc em, và làm em cười mỗi ngày.\n\nAnh yêu em, Ỉn ơi 💖",
      effect: "sparkle",                     // Hiệu ứng: pháo sáng
      gradient: ["#FF85C0", "#FFE4A0"],      // Gradient: pink → gold
    },
  ],

  // ─────────────────────────────────────────────
  // 📸 MÀN 4: ALBUM ẢNH
  // ─────────────────────────────────────────────
  // 📸 Thêm bao nhiêu ảnh cũng được!
  // Đặt ảnh vào assets/images/ và thêm vào danh sách bên dưới.
  gallery: [
    { src: "assets/images/gallery1.jpg", caption: "📝 Thay caption ảnh 1 ở đây" },
    { src: "assets/images/gallery2.jpg", caption: "📝 Thay caption ảnh 2 ở đây" },
    { src: "assets/images/gallery3.jpg", caption: "📝 Thay caption ảnh 3 ở đây" },
    { src: "assets/images/gallery4.jpg", caption: "📝 Thay caption ảnh 4 ở đây" },
    { src: "assets/images/gallery5.jpg", caption: "📝 Thay caption ảnh 5 ở đây" },
    { src: "assets/images/gallery6.jpg", caption: "📝 Thay caption ảnh 6 ở đây" },
    { src: "assets/images/gallery7.jpg", caption: "📝 Thay caption ảnh 7 ở đây" },
    { src: "assets/images/gallery8.jpg", caption: "📝 Thay caption ảnh 8 ở đây" },
    { src: "assets/images/gallery9.jpg", caption: "📝 Thay caption ảnh 9 ở đây" },
    { src: "assets/images/gallery10.jpg", caption: "📝 Thay caption ảnh 10 ở đây" },
    { src: "assets/images/gallery11.jpg", caption: "📝 Thay caption ảnh 11 ở đây" },
    { src: "assets/images/gallery12.jpg", caption: "📝 Thay caption ảnh 12 ở đây" },

  ],

  // ─────────────────────────────────────────────
  // 🎵 NHẠC NỀN
  // ─────────────────────────────────────────────
  musicSrc: "assets/music/sugar.mp3",  // Đường dẫn file nhạc

  // ─────────────────────────────────────────────
  // ❓ MÀN 5: CÂU HỎI YES/NO
  // ─────────────────────────────────────────────
  question: "Ỉn ơi... em hãy làm người yêu anh nhé? 🥺",
  noButtonTexts: [
    "Không",
    "Suy nghĩ lại đi~",
    "Thiệt hông? 🥹",
    "Em chắc chưa? 😢",
    "Anh buồn lắm á 😭",
    // Lần 6+ nút sẽ biến mất
  ],

  // ─────────────────────────────────────────────
  // 🎆 MÀN 6: CELEBRATION
  // ─────────────────────────────────────────────
  celebrationTitle: "YAY! Ỉn đồng ý rồi!!! 💖",
  celebrationSubtitle: "Anh yêu Ỉn nhiều lắm! 💕",
};
