import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    // ============================================================
    // COURSES
    // ============================================================
    await db.insert(schema.courses).values([
      { id: 1, title: "Spanish", imageSrc: "/es.svg" },
      { id: 2, title: "English", imageSrc: "/us.svg" },
    ]);

    // ============================================================
    // UNITS
    // ============================================================
    const units = [
      // Spanish — 1 unit
      { id: 1, courseId: 1, title: "Unit 1", description: "Learn the basics of Spanish", order: 1 },
      // English — 10 units (courseId = 2)
      { id: 2, courseId: 2, title: "Unit 1", description: "Chào hỏi & Giới thiệu", order: 1 },
      { id: 3, courseId: 2, title: "Unit 2", description: "Số đếm & Thời gian", order: 2 },
      { id: 4, courseId: 2, title: "Unit 3", description: "Màu sắc & Miêu tả", order: 3 },
      { id: 5, courseId: 2, title: "Unit 4", description: "Gia đình & Con người", order: 4 },
      { id: 6, courseId: 2, title: "Unit 5", description: "Đồ ăn & Thức uống", order: 5 },
      { id: 7, courseId: 2, title: "Unit 6", description: "Sinh hoạt hằng ngày", order: 6 },
      { id: 8, courseId: 2, title: "Unit 7", description: "Địa điểm & Chỉ đường", order: 7 },
      { id: 9, courseId: 2, title: "Unit 8", description: "Thời tiết & Mùa", order: 8 },
      { id: 10, courseId: 2, title: "Unit 9", description: "Mua sắm & Quần áo", order: 9 },
      { id: 11, courseId: 2, title: "Unit 10", description: "Du lịch & Đi lại", order: 10 },
    ];
    for (const u of units) {
      await db.insert(schema.units).values(u);
    }

    // ============================================================
    // LESSONS
    // ============================================================
    const lessons = [
      // Spanish — Unit 1 (unitId=1)
      { id: 1, unitId: 1, order: 1, title: "Nouns" },
      { id: 2, unitId: 1, order: 2, title: "Verbs" },
      { id: 3, unitId: 1, order: 3, title: "Phrases" },
      { id: 4, unitId: 1, order: 4, title: "Greetings" },
      { id: 5, unitId: 1, order: 5, title: "Questions" },

      // English — Unit 1 (unitId=2)
      { id: 6, unitId: 2, order: 1, title: "Hello & Goodbye" },
      { id: 7, unitId: 2, order: 2, title: "My name is..." },
      { id: 8, unitId: 2, order: 3, title: "How are you?" },
      { id: 9, unitId: 2, order: 4, title: "Nice to meet you" },

      // English — Unit 2 (unitId=3)
      { id: 10, unitId: 3, order: 1, title: "Numbers 1-10" },
      { id: 11, unitId: 3, order: 2, title: "Numbers 11-100" },
      { id: 12, unitId: 3, order: 3, title: "How many?" },
      { id: 13, unitId: 3, order: 4, title: "What time is it?" },

      // English — Unit 3 (unitId=4)
      { id: 14, unitId: 4, order: 1, title: "Basic Colors" },
      { id: 15, unitId: 4, order: 2, title: "Big & Small" },
      { id: 16, unitId: 4, order: 3, title: "Shapes" },
      { id: 17, unitId: 4, order: 4, title: "Adjectives" },

      // English — Unit 4 (unitId=5)
      { id: 18, unitId: 5, order: 1, title: "Family Members" },
      { id: 19, unitId: 5, order: 2, title: "Describing People" },
      { id: 20, unitId: 5, order: 3, title: "Jobs" },
      { id: 21, unitId: 5, order: 4, title: "Pronouns" },

      // English — Unit 5 (unitId=6)
      { id: 22, unitId: 6, order: 1, title: "Common Foods" },
      { id: 23, unitId: 6, order: 2, title: "Drinks" },
      { id: 24, unitId: 6, order: 3, title: "Ordering Food" },
      { id: 25, unitId: 6, order: 4, title: "Likes & Dislikes" },

      // English — Unit 6 (unitId=7)
      { id: 26, unitId: 7, order: 1, title: "Morning Routine" },
      { id: 27, unitId: 7, order: 2, title: "Days of the Week" },
      { id: 28, unitId: 7, order: 3, title: "Months & Dates" },
      { id: 29, unitId: 7, order: 4, title: "Daily Activities" },
      { id: 30, unitId: 7, order: 5, title: "Time Expressions" },

      // English — Unit 7 (unitId=8)
      { id: 31, unitId: 8, order: 1, title: "Places in Town" },
      { id: 32, unitId: 8, order: 2, title: "Asking Directions" },
      { id: 33, unitId: 8, order: 3, title: "Transportation" },
      { id: 34, unitId: 8, order: 4, title: "Prepositions" },

      // English — Unit 8 (unitId=9)
      { id: 35, unitId: 9, order: 1, title: "Weather Types" },
      { id: 36, unitId: 9, order: 2, title: "Seasons" },
      { id: 37, unitId: 9, order: 3, title: "Temperature" },
      { id: 38, unitId: 9, order: 4, title: "What to Wear" },

      // English — Unit 9 (unitId=10)
      { id: 39, unitId: 10, order: 1, title: "Clothes" },
      { id: 40, unitId: 10, order: 2, title: "Prices & Money" },
      { id: 41, unitId: 10, order: 3, title: "In a Store" },
      { id: 42, unitId: 10, order: 4, title: "Sizes & Colors" },

      // English — Unit 10 (unitId=11)
      { id: 43, unitId: 11, order: 1, title: "At the Airport" },
      { id: 44, unitId: 11, order: 2, title: "Hotel Check-in" },
      { id: 45, unitId: 11, order: 3, title: "Sightseeing" },
      { id: 46, unitId: 11, order: 4, title: "Making Plans" },
    ];
    for (const l of lessons) {
      await db.insert(schema.lessons).values(l);
    }

    // ============================================================
    // CHALLENGES — Spanish (lessonId 1-5)
    // ============================================================
    const challengesSpanish = [
      // Lesson 1: Nouns (id=1)
      { id: 1, lessonId: 1, type: "SELECT", question: 'Which one of these is the "the man"?', order: 1 },
      { id: 2, lessonId: 1, type: "ASSIST", question: '"the man"', order: 2 },
      { id: 3, lessonId: 1, type: "SELECT", question: 'Which one of these is the "the robot"?', order: 3 },
      // Lesson 2: Verbs (id=2)
      { id: 4, lessonId: 2, type: "SELECT", question: 'Which one of these is the "the man"?', order: 1 },
      { id: 5, lessonId: 2, type: "ASSIST", question: '"the man"', order: 2 },
      { id: 6, lessonId: 2, type: "SELECT", question: 'Which one of these is the "the robot"?', order: 3 },
      // Lesson 3: Phrases (id=3)
      { id: 7, lessonId: 3, type: "SELECT", question: 'Which one means "hello"?', order: 1 },
      { id: 8, lessonId: 3, type: "ASSIST", question: '"goodbye"', order: 2 },
      { id: 9, lessonId: 3, type: "SELECT", question: 'Which one means "thank you"?', order: 3 },
      // Lesson 4: Greetings (id=4)
      { id: 10, lessonId: 4, type: "SELECT", question: 'Which one means "good morning"?', order: 1 },
      { id: 11, lessonId: 4, type: "ASSIST", question: '"good night"', order: 2 },
      { id: 12, lessonId: 4, type: "SELECT", question: 'Which one means "see you later"?', order: 3 },
      // Lesson 5: Questions (id=5)
      { id: 13, lessonId: 5, type: "ASSIST", question: '"How are you?"', order: 1 },
      { id: 14, lessonId: 5, type: "SELECT", question: 'Which one means "What is your name?"?', order: 2 },
      { id: 15, lessonId: 5, type: "ASSIST", question: '"Where are you from?"', order: 3 },
    ];

    // ============================================================
    // CHALLENGES — English (lessonId 6-46)
    // ============================================================
    const challengesEnglish = [
      // --- Unit 1: Greetings ---
      // Lesson 6: Hello & Goodbye (lessonId=6)
      { id: 16, lessonId: 6, type: "SELECT", question: 'Which one means "Xin chào"?', order: 1 },
      { id: 17, lessonId: 6, type: "ASSIST", question: 'How do you say "Tạm biệt" in English?', order: 2 },
      { id: 18, lessonId: 6, type: "SELECT", question: 'Which one means "Chào buổi sáng"?', order: 3 },
      // Lesson 7: My name is... (lessonId=7)
      { id: 19, lessonId: 7, type: "ASSIST", question: 'How do you say "Tên tôi là John" in English?', order: 1 },
      { id: 20, lessonId: 7, type: "SELECT", question: 'Which one means "Bạn tên gì?"?', order: 2 },
      { id: 21, lessonId: 7, type: "ASSIST", question: 'How do you say "Tôi đến từ Việt Nam"?', order: 3 },
      // Lesson 8: How are you? (lessonId=8)
      { id: 22, lessonId: 8, type: "SELECT", question: 'Which one means "Bạn khỏe không?"?', order: 1 },
      { id: 23, lessonId: 8, type: "ASSIST", question: 'How do you say "Tôi khỏe, cảm ơn"?', order: 2 },
      { id: 24, lessonId: 8, type: "SELECT", question: 'Which one means "Còn bạn thì sao?"?', order: 3 },
      // Lesson 9: Nice to meet you (lessonId=9)
      { id: 25, lessonId: 9, type: "ASSIST", question: 'What does "See you later" mean?', order: 1 },
      { id: 26, lessonId: 9, type: "SELECT", question: 'Which one means "Không có gì" (reply to thank you)?', order: 2 },
      { id: 27, lessonId: 9, type: "ASSIST", question: 'How do you say "Xin lỗi" in English?', order: 3 },

      // --- Unit 2: Numbers ---
      // Lesson 10: Numbers 1-10 (lessonId=10)
      { id: 28, lessonId: 10, type: "SELECT", question: 'Which one is the number "3"?', order: 1 },
      { id: 29, lessonId: 10, type: "ASSIST", question: 'How do you say "số 7" in English?', order: 2 },
      { id: 30, lessonId: 10, type: "SELECT", question: 'Which one is the number "10"?', order: 3 },
      // Lesson 11: Numbers 11-100 (lessonId=11)
      { id: 31, lessonId: 11, type: "ASSIST", question: 'How do you say "15" in English?', order: 1 },
      { id: 32, lessonId: 11, type: "SELECT", question: 'Which one means "hai mươi"?', order: 2 },
      { id: 33, lessonId: 11, type: "ASSIST", question: 'How do you say "100" in English?', order: 3 },
      // Lesson 12: How many? (lessonId=12)
      { id: 34, lessonId: 12, type: "SELECT", question: 'Which one means "Có bao nhiêu?"?', order: 1 },
      { id: 35, lessonId: 12, type: "ASSIST", question: 'How do you say "Tôi có hai quyển sách"?', order: 2 },
      { id: 36, lessonId: 12, type: "SELECT", question: 'Which one means "rất nhiều"?', order: 3 },
      // Lesson 13: What time is it? (lessonId=13)
      { id: 37, lessonId: 13, type: "ASSIST", question: 'How do you say "Mấy giờ rồi?"?', order: 1 },
      { id: 38, lessonId: 13, type: "SELECT", question: 'Which one means "7 giờ 30 phút"?', order: 2 },
      { id: 39, lessonId: 13, type: "ASSIST", question: 'What does "half past three" mean?', order: 3 },

      // --- Unit 3: Colors & Descriptions ---
      // Lesson 14: Basic Colors (lessonId=14)
      { id: 40, lessonId: 14, type: "SELECT", question: 'Which one means "màu đỏ"?', order: 1 },
      { id: 41, lessonId: 14, type: "ASSIST", question: 'How do you say "màu xanh dương"?', order: 2 },
      { id: 42, lessonId: 14, type: "SELECT", question: 'Which one means "màu vàng"?', order: 3 },
      // Lesson 15: Big & Small (lessonId=15)
      { id: 43, lessonId: 15, type: "ASSIST", question: 'How do you say "Con chó này to"?', order: 1 },
      { id: 44, lessonId: 15, type: "SELECT", question: 'Which one means "nhỏ"?', order: 2 },
      { id: 45, lessonId: 15, type: "ASSIST", question: 'What is the opposite of "big"?', order: 3 },
      // Lesson 16: Shapes (lessonId=16)
      { id: 46, lessonId: 16, type: "SELECT", question: 'Which one means "hình tròn"?', order: 1 },
      { id: 47, lessonId: 16, type: "ASSIST", question: 'How do you say "hình vuông"?', order: 2 },
      { id: 48, lessonId: 16, type: "SELECT", question: 'Which one means "hình tam giác"?', order: 3 },
      // Lesson 17: Adjectives (lessonId=17)
      { id: 49, lessonId: 17, type: "ASSIST", question: 'How do you say "Cái này đẹp"?', order: 1 },
      { id: 50, lessonId: 17, type: "SELECT", question: 'Which one means "cũ"?', order: 2 },
      { id: 51, lessonId: 17, type: "ASSIST", question: 'What is the opposite of "hot"?', order: 3 },

      // --- Unit 4: Family & People ---
      // Lesson 18: Family Members (lessonId=18)
      { id: 52, lessonId: 18, type: "SELECT", question: 'Which one means "mẹ"?', order: 1 },
      { id: 53, lessonId: 18, type: "ASSIST", question: 'How do you say "anh trai" in English?', order: 2 },
      { id: 54, lessonId: 18, type: "SELECT", question: 'Which one means "ông bà"?', order: 3 },
      // Lesson 19: Describing People (lessonId=19)
      { id: 55, lessonId: 19, type: "ASSIST", question: 'How do you say "Anh ấy cao"?', order: 1 },
      { id: 56, lessonId: 19, type: "SELECT", question: 'Which one means "thấp"?', order: 2 },
      { id: 57, lessonId: 19, type: "ASSIST", question: 'What does "She is young" mean?', order: 3 },
      // Lesson 20: Jobs (lessonId=20)
      { id: 58, lessonId: 20, type: "SELECT", question: 'Which one means "bác sĩ"?', order: 1 },
      { id: 59, lessonId: 20, type: "ASSIST", question: 'How do you say "giáo viên"?', order: 2 },
      { id: 60, lessonId: 20, type: "SELECT", question: 'Which one means "kỹ sư"?', order: 3 },
      // Lesson 21: Pronouns (lessonId=21)
      { id: 61, lessonId: 21, type: "ASSIST", question: 'Which pronoun means "chúng tôi"?', order: 1 },
      { id: 62, lessonId: 21, type: "SELECT", question: 'Which pronoun is for a man?', order: 2 },
      { id: 63, lessonId: 21, type: "ASSIST", question: 'What does "they" refer to?', order: 3 },

      // --- Unit 5: Food & Drinks ---
      // Lesson 22: Common Foods (lessonId=22)
      { id: 64, lessonId: 22, type: "SELECT", question: 'Which one means "cơm"?', order: 1 },
      { id: 65, lessonId: 22, type: "ASSIST", question: 'How do you say "bánh mì"?', order: 2 },
      { id: 66, lessonId: 22, type: "SELECT", question: 'Which one means "thịt gà"?', order: 3 },
      // Lesson 23: Drinks (lessonId=23)
      { id: 67, lessonId: 23, type: "ASSIST", question: 'How do you say "nước lọc"?', order: 1 },
      { id: 68, lessonId: 23, type: "SELECT", question: 'Which one means "cà phê"?', order: 2 },
      { id: 69, lessonId: 23, type: "ASSIST", question: 'How do you say "trà sữa"?', order: 3 },
      // Lesson 24: Ordering Food (lessonId=24)
      { id: 70, lessonId: 24, type: "SELECT", question: 'Which one means "Cho tôi gọi món"?', order: 1 },
      { id: 71, lessonId: 24, type: "ASSIST", question: 'How do you say "Tôi muốn một cái burger"?', order: 2 },
      { id: 72, lessonId: 24, type: "SELECT", question: 'Which one means "Tính tiền"?', order: 3 },
      // Lesson 25: Likes & Dislikes (lessonId=25)
      { id: 73, lessonId: 25, type: "ASSIST", question: 'How do you say "Tôi thích pizza"?', order: 1 },
      { id: 74, lessonId: 25, type: "SELECT", question: 'Which one means "Tôi không thích"?', order: 2 },
      { id: 75, lessonId: 25, type: "ASSIST", question: 'What does "I love ice cream" mean?', order: 3 },

      // --- Unit 6: Daily Routines ---
      // Lesson 26: Morning Routine (lessonId=26)
      { id: 76, lessonId: 26, type: "SELECT", question: 'Which one means "thức dậy"?', order: 1 },
      { id: 77, lessonId: 26, type: "ASSIST", question: 'How do you say "đánh răng"?', order: 2 },
      { id: 78, lessonId: 26, type: "SELECT", question: 'Which one means "ăn sáng"?', order: 3 },
      // Lesson 27: Days of the Week (lessonId=27)
      { id: 79, lessonId: 27, type: "ASSIST", question: 'What day comes after Monday?', order: 1 },
      { id: 80, lessonId: 27, type: "SELECT", question: 'Which one means "Thứ Bảy"?', order: 2 },
      { id: 81, lessonId: 27, type: "ASSIST", question: 'How do you say "cuối tuần"?', order: 3 },
      // Lesson 28: Months & Dates (lessonId=28)
      { id: 82, lessonId: 28, type: "SELECT", question: 'Which month is after March?', order: 1 },
      { id: 83, lessonId: 28, type: "ASSIST", question: 'How do you say "tháng Mười Hai"?', order: 2 },
      { id: 84, lessonId: 28, type: "SELECT", question: 'Which one means "Hôm nay là ngày bao nhiêu?"?', order: 3 },
      // Lesson 29: Daily Activities (lessonId=29)
      { id: 85, lessonId: 29, type: "ASSIST", question: 'How do you say "Tôi đi làm"?', order: 1 },
      { id: 86, lessonId: 29, type: "SELECT", question: 'Which one means "nấu ăn"?', order: 2 },
      { id: 87, lessonId: 29, type: "ASSIST", question: 'How do you say "xem TV"?', order: 3 },
      // Lesson 30: Time Expressions (lessonId=30)
      { id: 88, lessonId: 30, type: "SELECT", question: 'Which one means "luôn luôn"?', order: 1 },
      { id: 89, lessonId: 30, type: "ASSIST", question: 'How do you say "thỉnh thoảng"?', order: 2 },
      { id: 90, lessonId: 30, type: "SELECT", question: 'Which one means "không bao giờ"?', order: 3 },

      // --- Unit 7: Places & Directions ---
      // Lesson 31: Places in Town (lessonId=31)
      { id: 91, lessonId: 31, type: "ASSIST", question: 'How do you say "bệnh viện"?', order: 1 },
      { id: 92, lessonId: 31, type: "SELECT", question: 'Which one means "siêu thị"?', order: 2 },
      { id: 93, lessonId: 31, type: "ASSIST", question: 'How do you say "ngân hàng"?', order: 3 },
      // Lesson 32: Asking Directions (lessonId=32)
      { id: 94, lessonId: 32, type: "SELECT", question: 'Which one means "rẽ trái"?', order: 1 },
      { id: 95, lessonId: 32, type: "ASSIST", question: 'How do you say "đi thẳng"?', order: 2 },
      { id: 96, lessonId: 32, type: "SELECT", question: 'Which one means "Ở đâu?"?', order: 3 },
      // Lesson 33: Transportation (lessonId=33)
      { id: 97, lessonId: 33, type: "ASSIST", question: 'How do you say "xe buýt"?', order: 1 },
      { id: 98, lessonId: 33, type: "SELECT", question: 'Which one means "tàu hỏa"?', order: 2 },
      { id: 99, lessonId: 33, type: "ASSIST", question: 'How do you say "Tôi đi bộ"?', order: 3 },
      // Lesson 34: Prepositions (lessonId=34)
      { id: 100, lessonId: 34, type: "SELECT", question: 'Which one means "ở trên"?', order: 1 },
      { id: 101, lessonId: 34, type: "ASSIST", question: 'How do you say "ở dưới"?', order: 2 },
      { id: 102, lessonId: 34, type: "SELECT", question: 'Which one means "ở giữa"?', order: 3 },

      // --- Unit 8: Weather & Seasons ---
      // Lesson 35: Weather Types (lessonId=35)
      { id: 103, lessonId: 35, type: "ASSIST", question: 'How do you say "Trời nắng"?', order: 1 },
      { id: 104, lessonId: 35, type: "SELECT", question: 'Which one means "trời mưa"?', order: 2 },
      { id: 105, lessonId: 35, type: "ASSIST", question: 'How do you say "Trời nhiều mây"?', order: 3 },
      // Lesson 36: Seasons (lessonId=36)
      { id: 106, lessonId: 36, type: "SELECT", question: 'Which one means "mùa hè"?', order: 1 },
      { id: 107, lessonId: 36, type: "ASSIST", question: 'How do you say "mùa đông"?', order: 2 },
      { id: 108, lessonId: 36, type: "SELECT", question: 'Which one means "mùa xuân"?', order: 3 },
      // Lesson 37: Temperature (lessonId=37)
      { id: 109, lessonId: 37, type: "ASSIST", question: 'How do you say "Trời nóng"?', order: 1 },
      { id: 110, lessonId: 37, type: "SELECT", question: 'Which one means "lạnh"?', order: 2 },
      { id: 111, lessonId: 37, type: "ASSIST", question: 'What does "It is warm" mean?', order: 3 },
      // Lesson 38: What to Wear (lessonId=38)
      { id: 112, lessonId: 38, type: "SELECT", question: 'Which one means "áo khoác"?', order: 1 },
      { id: 113, lessonId: 38, type: "ASSIST", question: 'How do you say "mang ô"?', order: 2 },
      { id: 114, lessonId: 38, type: "SELECT", question: 'Which one means "khăn quàng cổ"?', order: 3 },

      // --- Unit 9: Shopping & Clothes ---
      // Lesson 39: Clothes (lessonId=39)
      { id: 115, lessonId: 39, type: "ASSIST", question: 'How do you say "áo sơ mi"?', order: 1 },
      { id: 116, lessonId: 39, type: "SELECT", question: 'Which one means "quần jean"?', order: 2 },
      { id: 117, lessonId: 39, type: "ASSIST", question: 'How do you say "giày"?', order: 3 },
      // Lesson 40: Prices & Money (lessonId=40)
      { id: 118, lessonId: 40, type: "SELECT", question: 'Which one means "Cái này giá bao nhiêu?"?', order: 1 },
      { id: 119, lessonId: 40, type: "ASSIST", question: 'How do you say "Nó giá 10 đô la"?', order: 2 },
      { id: 120, lessonId: 40, type: "SELECT", question: 'Which one means "đắt"?', order: 3 },
      // Lesson 41: In a Store (lessonId=41)
      { id: 121, lessonId: 41, type: "ASSIST", question: 'How do you say "Tôi chỉ xem thôi"?', order: 1 },
      { id: 122, lessonId: 41, type: "SELECT", question: 'Which one means "Tôi muốn mua cái này"?', order: 2 },
      { id: 123, lessonId: 41, type: "ASSIST", question: 'How do you say "thanh toán"?', order: 3 },
      // Lesson 42: Sizes & Colors (lessonId=42)
      { id: 124, lessonId: 42, type: "SELECT", question: 'Which one means "cỡ nhỏ"?', order: 1 },
      { id: 125, lessonId: 42, type: "ASSIST", question: 'How do you say "cỡ lớn"?', order: 2 },
      { id: 126, lessonId: 42, type: "SELECT", question: 'Which one means "màu đen"?', order: 3 },

      // --- Unit 10: Travel ---
      // Lesson 43: At the Airport (lessonId=43)
      { id: 127, lessonId: 43, type: "ASSIST", question: 'How do you say "hộ chiếu"?', order: 1 },
      { id: 128, lessonId: 43, type: "SELECT", question: 'Which one means "vé máy bay"?', order: 2 },
      { id: 129, lessonId: 43, type: "ASSIST", question: 'How do you say "Chuyến bay bị hoãn"?', order: 3 },
      // Lesson 44: Hotel Check-in (lessonId=44)
      { id: 130, lessonId: 44, type: "SELECT", question: 'Which one means "Tôi đã đặt phòng"?', order: 1 },
      { id: 131, lessonId: 44, type: "ASSIST", question: 'How do you say "phòng đơn"?', order: 2 },
      { id: 132, lessonId: 44, type: "SELECT", question: 'Which one means "Bao gồm bữa sáng"?', order: 3 },
      // Lesson 45: Sightseeing (lessonId=45)
      { id: 133, lessonId: 45, type: "ASSIST", question: 'How do you say "bảo tàng"?', order: 1 },
      { id: 134, lessonId: 45, type: "SELECT", question: 'Which one means "Tôi muốn đi tham quan"?', order: 2 },
      { id: 135, lessonId: 45, type: "ASSIST", question: 'How do you say "Chụp ảnh"?', order: 3 },
      // Lesson 46: Making Plans (lessonId=46)
      { id: 136, lessonId: 46, type: "SELECT", question: 'Which one means "Bạn muốn đi đâu?"?', order: 1 },
      { id: 137, lessonId: 46, type: "ASSIST", question: 'How do you say "Hẹn gặp bạn lúc 7 giờ"?', order: 2 },
      { id: 138, lessonId: 46, type: "SELECT", question: 'Which one means "Chúc chuyến đi vui vẻ"?', order: 3 },
    ];

    const allChallenges = [...challengesSpanish, ...challengesEnglish];
    for (const c of allChallenges) {
      await db.insert(schema.challenges).values(c);
    }

    // ============================================================
    // CHALLENGE OPTIONS — Spanish (challengeId 1-15)
    // ============================================================
    const optionsSpanish = [
      // Challenge 1: "the man"?
      { challengeId: 1, text: "el hombre", correct: true, imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
      { challengeId: 1, text: "la mujer", correct: false, imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
      { challengeId: 1, text: "el robot", correct: false, imageSrc: "/robot.svg", audioSrc: "/es_robot.mp3" },
      // Challenge 2: "the man"
      { challengeId: 2, text: "el hombre", correct: true, imageSrc: null, audioSrc: "/es_man.mp3" },
      { challengeId: 2, text: "la mujer", correct: false, imageSrc: null, audioSrc: "/es_woman.mp3" },
      { challengeId: 2, text: "el robot", correct: false, imageSrc: null, audioSrc: "/es_robot.mp3" },
      // Challenge 3: "the robot"?
      { challengeId: 3, text: "el hombre", correct: false, imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
      { challengeId: 3, text: "la mujer", correct: false, imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
      { challengeId: 3, text: "el robot", correct: true, imageSrc: "/robot.svg", audioSrc: "/es_robot.mp3" },
      // Challenge 4: "the man"?
      { challengeId: 4, text: "el hombre", correct: true, imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
      { challengeId: 4, text: "la mujer", correct: false, imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
      { challengeId: 4, text: "el robot", correct: false, imageSrc: "/robot.svg", audioSrc: "/es_robot.mp3" },
      // Challenge 5: "the man"
      { challengeId: 5, text: "el hombre", correct: true, imageSrc: null, audioSrc: "/es_man.mp3" },
      { challengeId: 5, text: "la mujer", correct: false, imageSrc: null, audioSrc: "/es_woman.mp3" },
      { challengeId: 5, text: "el robot", correct: false, imageSrc: null, audioSrc: "/es_robot.mp3" },
      // Challenge 6: "the robot"?
      { challengeId: 6, text: "el hombre", correct: false, imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
      { challengeId: 6, text: "la mujer", correct: false, imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
      { challengeId: 6, text: "el robot", correct: true, imageSrc: "/robot.svg", audioSrc: "/es_robot.mp3" },
      // Challenge 7: "hello"?
      { challengeId: 7, text: "hola", correct: true, imageSrc: "/boy.svg", audioSrc: "/es_boy.mp3" },
      { challengeId: 7, text: "adiós", correct: false, imageSrc: "/girl.svg", audioSrc: "/es_girl.mp3" },
      { challengeId: 7, text: "gracias", correct: false, imageSrc: "/zombie.svg", audioSrc: "/es_zombie.mp3" },
      // Challenge 8: "goodbye"
      { challengeId: 8, text: "adiós", correct: true, imageSrc: null, audioSrc: "/es_girl.mp3" },
      { challengeId: 8, text: "hola", correct: false, imageSrc: null, audioSrc: "/es_boy.mp3" },
      { challengeId: 8, text: "gracias", correct: false, imageSrc: null, audioSrc: "/es_zombie.mp3" },
      // Challenge 9: "thank you"?
      { challengeId: 9, text: "gracias", correct: true, imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
      { challengeId: 9, text: "hola", correct: false, imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
      { challengeId: 9, text: "adiós", correct: false, imageSrc: "/robot.svg", audioSrc: "/es_robot.mp3" },
      // Challenge 10: "good morning"?
      { challengeId: 10, text: "buenos días", correct: true, imageSrc: "/boy.svg", audioSrc: "/es_boy.mp3" },
      { challengeId: 10, text: "buenas noches", correct: false, imageSrc: "/girl.svg", audioSrc: "/es_girl.mp3" },
      { challengeId: 10, text: "buenas tardes", correct: false, imageSrc: "/zombie.svg", audioSrc: "/es_zombie.mp3" },
      // Challenge 11: "good night"
      { challengeId: 11, text: "buenas noches", correct: true, imageSrc: null, audioSrc: "/es_girl.mp3" },
      { challengeId: 11, text: "buenos días", correct: false, imageSrc: null, audioSrc: "/es_boy.mp3" },
      { challengeId: 11, text: "hola", correct: false, imageSrc: null, audioSrc: "/es_man.mp3" },
      // Challenge 12: "see you later"?
      { challengeId: 12, text: "hasta luego", correct: true, imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
      { challengeId: 12, text: "adiós", correct: false, imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
      { challengeId: 12, text: "hola", correct: false, imageSrc: "/robot.svg", audioSrc: "/es_robot.mp3" },
      // Challenge 13: "How are you?"
      { challengeId: 13, text: "¿cómo estás?", correct: true, imageSrc: null, audioSrc: "/es_man.mp3" },
      { challengeId: 13, text: "¿cómo te llamas?", correct: false, imageSrc: null, audioSrc: "/es_woman.mp3" },
      { challengeId: 13, text: "¿de dónde eres?", correct: false, imageSrc: null, audioSrc: "/es_robot.mp3" },
      // Challenge 14: "What is your name?"?
      { challengeId: 14, text: "¿cómo te llamas?", correct: true, imageSrc: "/boy.svg", audioSrc: "/es_boy.mp3" },
      { challengeId: 14, text: "¿cómo estás?", correct: false, imageSrc: "/girl.svg", audioSrc: "/es_girl.mp3" },
      { challengeId: 14, text: "¿de dónde eres?", correct: false, imageSrc: "/zombie.svg", audioSrc: "/es_zombie.mp3" },
      // Challenge 15: "Where are you from?"
      { challengeId: 15, text: "¿de dónde eres?", correct: true, imageSrc: null, audioSrc: "/es_robot.mp3" },
      { challengeId: 15, text: "¿cómo estás?", correct: false, imageSrc: null, audioSrc: "/es_man.mp3" },
      { challengeId: 15, text: "¿cómo te llamas?", correct: false, imageSrc: null, audioSrc: "/es_woman.mp3" },
    ];

    // ============================================================
    // CHALLENGE OPTIONS — English (challengeId 16-138)
    // ============================================================
    const optionsEnglish = [
      // Challenge 16: Which one means "Xin chào"?
      { challengeId: 16, text: "Hello", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 16, text: "Goodbye", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 16, text: "Thank you", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 17: "Tạm biệt"
      { challengeId: 17, text: "Goodbye", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 17, text: "Hello", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 17, text: "Sorry", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 18: "Chào buổi sáng"
      { challengeId: 18, text: "Good morning", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 18, text: "Good night", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 18, text: "Goodbye", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 19: "Tên tôi là John"
      { challengeId: 19, text: "My name is John", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 19, text: "I am John", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 19, text: "You are John", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 20: "Bạn tên gì?"
      { challengeId: 20, text: "What is your name?", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 20, text: "How are you?", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 20, text: "Where are you?", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 21: "Tôi đến từ Việt Nam"
      { challengeId: 21, text: "I am from Vietnam", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 21, text: "I like Vietnam", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 21, text: "I go to Vietnam", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 22: "Bạn khỏe không?"
      { challengeId: 22, text: "How are you?", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 22, text: "What is your name?", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 22, text: "Where are you from?", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 23: "Tôi khỏe, cảm ơn"
      { challengeId: 23, text: "I'm fine, thank you", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 23, text: "I'm sorry", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 23, text: "You're welcome", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 24: "Còn bạn thì sao?"
      { challengeId: 24, text: "And you?", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 24, text: "Me too", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 24, text: "Not bad", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 25: "See you later"
      { challengeId: 25, text: "Hẹn gặp lại", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 25, text: "Chào buổi sáng", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 25, text: "Cảm ơn", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 26: "Không có gì"
      { challengeId: 26, text: "You're welcome", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 26, text: "I'm sorry", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 26, text: "Excuse me", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 27: "Xin lỗi"
      { challengeId: 27, text: "I'm sorry", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 27, text: "Thank you", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 27, text: "Goodbye", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 28: number "3"
      { challengeId: 28, text: "Three", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 28, text: "Two", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 28, text: "Four", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 29: "số 7"
      { challengeId: 29, text: "Seven", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 29, text: "Six", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 29, text: "Eight", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 30: number "10"
      { challengeId: 30, text: "Ten", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 30, text: "Nine", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 30, text: "Eight", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 31: "15"
      { challengeId: 31, text: "Fifteen", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 31, text: "Fifty", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 31, text: "Five", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 32: "hai mươi"
      { challengeId: 32, text: "Twenty", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 32, text: "Twelve", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 32, text: "Two", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 33: "100"
      { challengeId: 33, text: "One hundred", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 33, text: "One thousand", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 33, text: "Ten", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 34: "Có bao nhiêu?"
      { challengeId: 34, text: "How many?", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 34, text: "How much?", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 34, text: "How old?", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 35: "Tôi có hai quyển sách"
      { challengeId: 35, text: "I have two books", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 35, text: "I have three books", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 35, text: "I want two books", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 36: "rất nhiều"
      { challengeId: 36, text: "A lot", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 36, text: "A little", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 36, text: "None", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 37: "Mấy giờ rồi?"
      { challengeId: 37, text: "What time is it?", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 37, text: "What day is it?", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 37, text: "What date is it?", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 38: "7 giờ 30 phút"
      { challengeId: 38, text: "Seven thirty", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 38, text: "Seven o'clock", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 38, text: "Seven fifteen", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 39: "half past three"
      { challengeId: 39, text: "3 giờ 30 phút", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 39, text: "3 giờ đúng", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 39, text: "3 giờ 15 phút", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 40: "màu đỏ"
      { challengeId: 40, text: "Red", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 40, text: "Blue", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 40, text: "Green", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 41: "màu xanh dương"
      { challengeId: 41, text: "Blue", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 41, text: "Yellow", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 41, text: "Green", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 42: "màu vàng"
      { challengeId: 42, text: "Yellow", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 42, text: "White", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 42, text: "Red", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 43: "Con chó này to"
      { challengeId: 43, text: "This dog is big", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 43, text: "This dog is small", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 43, text: "This cat is big", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 44: "nhỏ"
      { challengeId: 44, text: "Small", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 44, text: "Big", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 44, text: "Tall", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 45: opposite of "big"
      { challengeId: 45, text: "Small", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 45, text: "Large", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 45, text: "Huge", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 46: "hình tròn"
      { challengeId: 46, text: "Circle", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 46, text: "Square", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 46, text: "Triangle", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 47: "hình vuông"
      { challengeId: 47, text: "Square", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 47, text: "Circle", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 47, text: "Rectangle", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 48: "hình tam giác"
      { challengeId: 48, text: "Triangle", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 48, text: "Square", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 48, text: "Circle", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 49: "Cái này đẹp"
      { challengeId: 49, text: "This is beautiful", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 49, text: "This is ugly", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 49, text: "This is old", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 50: "cũ"
      { challengeId: 50, text: "Old", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 50, text: "New", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 50, text: "Young", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 51: opposite of "hot"
      { challengeId: 51, text: "Cold", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 51, text: "Warm", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 51, text: "Cool", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 52: "mẹ"
      { challengeId: 52, text: "Mother", correct: true, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 52, text: "Father", correct: false, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 52, text: "Sister", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      // Challenge 53: "anh trai"
      { challengeId: 53, text: "Brother", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 53, text: "Sister", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 53, text: "Father", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 54: "ông bà"
      { challengeId: 54, text: "Grandparents", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 54, text: "Parents", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 54, text: "Children", correct: false, imageSrc: "/boy.svg", audioSrc: null },
      // Challenge 55: "Anh ấy cao"
      { challengeId: 55, text: "He is tall", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 55, text: "He is short", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 55, text: "She is tall", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 56: "thấp"
      { challengeId: 56, text: "Short", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 56, text: "Tall", correct: false, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 56, text: "Big", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 57: "She is young"
      { challengeId: 57, text: "Cô ấy trẻ", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 57, text: "Cô ấy già", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 57, text: "Cô ấy đẹp", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 58: "bác sĩ"
      { challengeId: 58, text: "Doctor", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 58, text: "Teacher", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 58, text: "Engineer", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 59: "giáo viên"
      { challengeId: 59, text: "Teacher", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 59, text: "Doctor", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 59, text: "Nurse", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 60: "kỹ sư"
      { challengeId: 60, text: "Engineer", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 60, text: "Student", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 60, text: "Driver", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 61: "chúng tôi"
      { challengeId: 61, text: "We", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 61, text: "They", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 61, text: "You", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 62: pronoun for man
      { challengeId: 62, text: "He", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 62, text: "She", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 62, text: "It", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 63: "they"
      { challengeId: 63, text: "Họ / Chúng nó", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 63, text: "Chúng tôi", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 63, text: "Bạn", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 64: "cơm"
      { challengeId: 64, text: "Rice", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 64, text: "Bread", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 64, text: "Noodles", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 65: "bánh mì"
      { challengeId: 65, text: "Bread", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 65, text: "Rice", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 65, text: "Cake", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 66: "thịt gà"
      { challengeId: 66, text: "Chicken", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 66, text: "Beef", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 66, text: "Pork", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 67: "nước lọc"
      { challengeId: 67, text: "Water", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 67, text: "Juice", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 67, text: "Milk", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 68: "cà phê"
      { challengeId: 68, text: "Coffee", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 68, text: "Tea", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 68, text: "Beer", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 69: "trà sữa"
      { challengeId: 69, text: "Milk tea", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 69, text: "Green tea", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 69, text: "Hot chocolate", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 70: "Cho tôi gọi món"
      { challengeId: 70, text: "I would like to order", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 70, text: "I would like to pay", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 70, text: "I would like to go", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 71: "Tôi muốn một cái burger"
      { challengeId: 71, text: "I want a burger", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 71, text: "I have a burger", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 71, text: "I like burgers", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 72: "Tính tiền"
      { challengeId: 72, text: "Check, please", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 72, text: "Order, please", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 72, text: "Menu, please", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 73: "Tôi thích pizza"
      { challengeId: 73, text: "I like pizza", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 73, text: "I hate pizza", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 73, text: "I make pizza", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 74: "Tôi không thích"
      { challengeId: 74, text: "I don't like", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 74, text: "I like", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 74, text: "I love", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 75: "I love ice cream"
      { challengeId: 75, text: "Tôi rất thích kem", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 75, text: "Tôi ghét kem", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 75, text: "Tôi muốn kem", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 76: "thức dậy"
      { challengeId: 76, text: "Wake up", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 76, text: "Go to sleep", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 76, text: "Sit down", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 77: "đánh răng"
      { challengeId: 77, text: "Brush teeth", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 77, text: "Wash face", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 77, text: "Comb hair", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 78: "ăn sáng"
      { challengeId: 78, text: "Eat breakfast", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 78, text: "Eat lunch", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 78, text: "Eat dinner", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 79: day after Monday
      { challengeId: 79, text: "Tuesday", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 79, text: "Wednesday", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 79, text: "Sunday", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 80: "Thứ Bảy"
      { challengeId: 80, text: "Saturday", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 80, text: "Sunday", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 80, text: "Friday", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 81: "cuối tuần"
      { challengeId: 81, text: "Weekend", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 81, text: "Weekday", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 81, text: "Monday", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 82: month after March
      { challengeId: 82, text: "April", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 82, text: "May", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 82, text: "February", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 83: "tháng Mười Hai"
      { challengeId: 83, text: "December", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 83, text: "November", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 83, text: "January", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 84: "Hôm nay là ngày bao nhiêu?"
      { challengeId: 84, text: "What is the date today?", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 84, text: "What day is it?", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 84, text: "What time is it?", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 85: "Tôi đi làm"
      { challengeId: 85, text: "I go to work", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 85, text: "I go to school", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 85, text: "I go home", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 86: "nấu ăn"
      { challengeId: 86, text: "Cook", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 86, text: "Clean", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 86, text: "Sleep", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 87: "xem TV"
      { challengeId: 87, text: "Watch TV", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 87, text: "Read a book", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 87, text: "Play games", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 88: "luôn luôn"
      { challengeId: 88, text: "Always", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 88, text: "Sometimes", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 88, text: "Never", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 89: "thỉnh thoảng"
      { challengeId: 89, text: "Sometimes", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 89, text: "Always", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 89, text: "Rarely", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 90: "không bao giờ"
      { challengeId: 90, text: "Never", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 90, text: "Always", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 90, text: "Often", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 91: "bệnh viện"
      { challengeId: 91, text: "Hospital", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 91, text: "School", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 91, text: "Library", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 92: "siêu thị"
      { challengeId: 92, text: "Supermarket", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 92, text: "Restaurant", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 92, text: "Park", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 93: "ngân hàng"
      { challengeId: 93, text: "Bank", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 93, text: "Store", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 93, text: "Office", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 94: "rẽ trái"
      { challengeId: 94, text: "Turn left", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 94, text: "Turn right", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 94, text: "Go straight", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 95: "đi thẳng"
      { challengeId: 95, text: "Go straight", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 95, text: "Turn left", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 95, text: "Stop here", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 96: "Ở đâu?"
      { challengeId: 96, text: "Where is it?", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 96, text: "What is it?", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 96, text: "Who is it?", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 97: "xe buýt"
      { challengeId: 97, text: "Bus", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 97, text: "Train", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 97, text: "Car", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 98: "tàu hỏa"
      { challengeId: 98, text: "Train", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 98, text: "Bus", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 98, text: "Plane", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 99: "Tôi đi bộ"
      { challengeId: 99, text: "I walk", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 99, text: "I drive", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 99, text: "I run", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 100: "ở trên"
      { challengeId: 100, text: "On", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 100, text: "Under", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 100, text: "Next to", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 101: "ở dưới"
      { challengeId: 101, text: "Under", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 101, text: "On", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 101, text: "Behind", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 102: "ở giữa"
      { challengeId: 102, text: "Between", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 102, text: "Behind", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 102, text: "In front of", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 103: "Trời nắng"
      { challengeId: 103, text: "It is sunny", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 103, text: "It is rainy", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 103, text: "It is windy", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 104: "trời mưa"
      { challengeId: 104, text: "It is rainy", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 104, text: "It is sunny", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 104, text: "It is snowy", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 105: "Trời nhiều mây"
      { challengeId: 105, text: "It is cloudy", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 105, text: "It is stormy", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 105, text: "It is foggy", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 106: "mùa hè"
      { challengeId: 106, text: "Summer", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 106, text: "Winter", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 106, text: "Spring", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 107: "mùa đông"
      { challengeId: 107, text: "Winter", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 107, text: "Summer", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 107, text: "Autumn", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 108: "mùa xuân"
      { challengeId: 108, text: "Spring", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 108, text: "Summer", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 108, text: "Winter", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 109: "Trời nóng"
      { challengeId: 109, text: "It is hot", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 109, text: "It is cold", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 109, text: "It is warm", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 110: "lạnh"
      { challengeId: 110, text: "Cold", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 110, text: "Hot", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 110, text: "Cool", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 111: "It is warm"
      { challengeId: 111, text: "Trời ấm áp", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 111, text: "Trời nóng", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 111, text: "Trời lạnh", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 112: "áo khoác"
      { challengeId: 112, text: "Jacket", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 112, text: "Shirt", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 112, text: "Hat", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 113: "mang ô"
      { challengeId: 113, text: "Bring an umbrella", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 113, text: "Wear a coat", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 113, text: "Put on sunscreen", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 114: "khăn quàng cổ"
      { challengeId: 114, text: "Scarf", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 114, text: "Gloves", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 114, text: "Socks", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 115: "áo sơ mi"
      { challengeId: 115, text: "Shirt", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 115, text: "Pants", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 115, text: "Dress", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 116: "quần jean"
      { challengeId: 116, text: "Jeans", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 116, text: "Shorts", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 116, text: "Skirt", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      // Challenge 117: "giày"
      { challengeId: 117, text: "Shoes", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 117, text: "Socks", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 117, text: "Hat", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 118: "Cái này giá bao nhiêu?"
      { challengeId: 118, text: "How much is this?", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 118, text: "What is this?", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 118, text: "Where is this?", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 119: "Nó giá 10 đô la"
      { challengeId: 119, text: "It costs ten dollars", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 119, text: "It costs ten euros", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 119, text: "It is ten kilometers", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 120: "đắt"
      { challengeId: 120, text: "Expensive", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 120, text: "Cheap", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 120, text: "Free", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 121: "Tôi chỉ xem thôi"
      { challengeId: 121, text: "I'm just looking", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 121, text: "I want to buy", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 121, text: "I need help", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 122: "Tôi muốn mua cái này"
      { challengeId: 122, text: "I want to buy this", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 122, text: "I want to see this", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 122, text: "I want to return this", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 123: "thanh toán"
      { challengeId: 123, text: "Checkout", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 123, text: "Discount", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 123, text: "Receipt", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 124: "cỡ nhỏ"
      { challengeId: 124, text: "Small size", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 124, text: "Medium size", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 124, text: "Large size", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 125: "cỡ lớn"
      { challengeId: 125, text: "Large size", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 125, text: "Small size", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 125, text: "Extra large", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 126: "màu đen"
      { challengeId: 126, text: "Black", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 126, text: "White", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 126, text: "Brown", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 127: "hộ chiếu"
      { challengeId: 127, text: "Passport", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 127, text: "Ticket", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 127, text: "Visa", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 128: "vé máy bay"
      { challengeId: 128, text: "Flight ticket", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 128, text: "Bus ticket", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 128, text: "Train ticket", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 129: "Chuyến bay bị hoãn"
      { challengeId: 129, text: "The flight is delayed", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 129, text: "The flight is on time", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 129, text: "The flight is canceled", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 130: "Tôi đã đặt phòng"
      { challengeId: 130, text: "I have a reservation", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 130, text: "I need a room", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 130, text: "I want to check out", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 131: "phòng đơn"
      { challengeId: 131, text: "Single room", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 131, text: "Double room", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 131, text: "Suite", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 132: "Bao gồm bữa sáng"
      { challengeId: 132, text: "Breakfast included", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 132, text: "Dinner included", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 132, text: "WiFi included", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 133: "bảo tàng"
      { challengeId: 133, text: "Museum", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 133, text: "Library", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 133, text: "Theater", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 134: "Tôi muốn đi tham quan"
      { challengeId: 134, text: "I want to go sightseeing", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 134, text: "I want to go shopping", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 134, text: "I want to go swimming", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
      // Challenge 135: "Chụp ảnh"
      { challengeId: 135, text: "Take a photo", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 135, text: "Buy a ticket", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 135, text: "Get a map", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 136: "Bạn muốn đi đâu?"
      { challengeId: 136, text: "Where do you want to go?", correct: true, imageSrc: "/man.svg", audioSrc: null },
      { challengeId: 136, text: "When do you want to go?", correct: false, imageSrc: "/woman.svg", audioSrc: null },
      { challengeId: 136, text: "How do you want to go?", correct: false, imageSrc: "/robot.svg", audioSrc: null },
      // Challenge 137: "Hẹn gặp bạn lúc 7 giờ"
      { challengeId: 137, text: "See you at 7 o'clock", correct: true, imageSrc: null, audioSrc: null },
      { challengeId: 137, text: "See you tomorrow", correct: false, imageSrc: null, audioSrc: null },
      { challengeId: 137, text: "See you next week", correct: false, imageSrc: null, audioSrc: null },
      // Challenge 138: "Chúc chuyến đi vui vẻ"
      { challengeId: 138, text: "Have a nice trip", correct: true, imageSrc: "/boy.svg", audioSrc: null },
      { challengeId: 138, text: "Have a nice meal", correct: false, imageSrc: "/girl.svg", audioSrc: null },
      { challengeId: 138, text: "Have a nice day", correct: false, imageSrc: "/zombie.svg", audioSrc: null },
    ];

    const allOptions = [...optionsSpanish, ...optionsEnglish];
    for (const o of allOptions) {
      await db.insert(schema.challengeOptions).values(o);
    }

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
