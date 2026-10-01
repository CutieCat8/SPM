# ชีทติวสอบ 960200 Software Project Management

เปิด `index.html` ได้เลย (ไม่ต้องใช้ server)

## โครงสร้าง
```
index.html          # ไฟล์ที่ build แล้ว (อย่าแก้ตรงนี้)
build.js            # รวม src/ -> index.html   (node build.js)
src/
  index.html        # template: nav, hero, footer + <!-- @include --> ของแต่ละ section
  sections/         # เนื้อหาแต่ละ Unit (u1..u12, ra, uml, quiz, cheat)
css/                # base, nav, hero, typography, components, quiz, responsive, print
js/main.js          # progress bar, nav highlight, ค้นหา, print
```

## วิธีแก้เนื้อหา
แก้ไฟล์ใน `src/sections/` แล้วรัน `node build.js`
