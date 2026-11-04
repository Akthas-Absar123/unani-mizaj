# Unani Mizaj (Temperament) Assessment System
### 15 Questions • Damwi, Balghami, Safrawi, Saudawi

> **Heading:**  
> *"Answer the following questions to identify your predominant Unani temperament: Damwi, Balghami, Safrawi or Saudawi."*

---

## 🌿 The 4 Unani Temperaments & Option Mappings

Every question contains 4 options representing the four classical Unani humours (*Akhlat*):

| Option | Unani Temperament | Element (*Unsur*) | Qualities (*Kaifiyat*) | Core Characteristics |
| :---: | :--- | :--- | :--- | :--- |
| **a** | **Damwi** (Sanguine / خلط الدم) | **Air** (වායුව) | **Hot & Moist** (උනුසුම් සහ තෙත්) | Muscular, warm rosy skin, energetic, cheerful, sociable |
| **b** | **Balghami** (Phlegmatic / خلط البلغم) | **Water** (ජලය) | **Cold & Moist** (සීතල සහ තෙත්) | Fleshy build, cool pale skin, calm, patient, longer sleep |
| **c** | **Safrawi** (Choleric / خلط الصفراء) | **Fire** (ගින්දර) | **Hot & Dry** (උනුසුම් සහ වියලි) | Lean build, warm yellowish skin, ambitious, sharp, quick-tempered |
| **d** | **Saudawi** (Melancholic / خلط السوداء) | **Earth** (පෘථිවිය) | **Cold & Dry** (සීතල සහ වියලි) | Slender bony frame, cool darkish skin, analytical, deep thinker |

---

## 📁 Included Solutions

### 1. **Interactive Web App (`index.html`)** — *Recommended for Instant On-Screen Results*
- **Instant Result On Screen**: Because native Google Forms only shows a static confirmation screen, this interactive web app gives users their predominant temperament immediately upon clicking Submit.
- **Visual Progress & Analytics**: Real-time progress bar, percentage distribution bars for all 4 humours, in-depth Unani personality descriptions, and dietary/lifestyle (*Ilaj-bil-Tadbeer*) recommendations.
- **Print / PDF Export**: One-click button to print or save the diagnosis as a PDF.
- **How to Run**: Simply double-click [`index.html`](file:///c:/Users/LENOVO/Desktop/tharik/index.html) in your file manager to open it in Chrome, Edge, Safari, or on a smartphone!

---

### 2. **Google Form 1-Click Auto-Creator (`google_form_creator.gs`)**
Builds the entire Google Form with the exact heading, all 15 bilingual questions (English + Sinhala), and linked Google Sheet in 5 seconds.

#### How to use:
1. Open [Google Apps Script Home](https://script.google.com/home) in your web browser.
2. Click **+ New Project**.
3. Delete any placeholder code and paste the code from [`google_form_creator.gs`](file:///c:/Users/LENOVO/Desktop/tharik/google_form_creator.gs).
4. Select `createUnaniTemperamentForm` from the function dropdown and click **Run** (▶).
5. Grant permissions. Check the **Execution Log** at the bottom: it will display the direct links to your new Google Form and Google Sheet!

---

### 3. **Google Sheet Automatic Calculator & Emailer (`google_form_sheet_calculator.js`)**
Calculates the predominant temperament automatically whenever someone submits your Google Form and logs it in Google Sheets.

#### How to install in your Google Form's spreadsheet:
1. Open your Google Form $\rightarrow$ Go to the **Responses** tab $\rightarrow$ Click **Link to Sheets** (green spreadsheet icon).
2. In the opened Google Sheet, click **Extensions** $\rightarrow$ **Apps Script** in the top menu.
3. Replace any code with [`google_form_sheet_calculator.js`](file:///c:/Users/LENOVO/Desktop/tharik/google_form_sheet_calculator.js) and click **Save** (💾).
4. Click the **Triggers** icon (⏰ clock icon on the left sidebar).
5. Click **+ Add Trigger** (bottom right):
   - **Choose which function to run:** `onFormSubmit`
   - **Select event source:** `From spreadsheet`
   - **Select event type:** `On form submit`
6. Click **Save** and grant permissions.

Now, whenever anyone submits the form:
- Their scores for **Damwi**, **Balghami**, **Safrawi**, and **Saudawi** are tallied automatically.
- Their **Predominant Temperament** is calculated and saved into new columns in your Google Sheet.
- If email is collected, a personalized HTML Temperament Report with full breakdown and health advice is sent directly to their inbox!
