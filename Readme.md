# **Network Graph Viewer** 🌐📊  

A **web-based network visualization tool** that allows users to upload **CSV or JSON files**, visualize network graphs using **Cytoscape.js**, and extract subgraphs of **first-degree neighbors** for a given set of nodes.
## 📹 Demo Video
[Watch the Demo](https://www.youtube.com/watch?v=hyH88_GdlNs)


## **🔧 Features**
✅ Upload and visualize **network graphs** from CSV/JSON files  
✅ Extract **subgraph** of first-degree neighbors of a given node  
✅ Supports **multiple layouts** (Grid, Circle, CoSE, Breadthfirst)  
✅ **Error handling** for invalid file formats and missing data  
✅ Interactive **zoom, pan, and layout selection**  

---

## **📂 Folder Structure**
```
/project-root
│── /static
│   ├── /js
│   │   ├── script.js   # Main JavaScript file for handling file uploads & visualization
│   ├── /css
│── /templates
│   ├── index.html      # Main frontend UI
│── app.py             # Flask backend 
│── requirements.txt   # Python dependencies
│── README.md          # Project documentation
```

---

## **🛠️ Installation and Setup**  

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/ankushthedeveloper/Network-Graph-Viewer.git
cd network-graph-viewer
```

### **2️⃣ Install Dependencies**  
**For frontend (static files only, no backend needed):**  
No setup required, just open `index.html` in a browser.

**For Flask Backend (if included):**  
```bash
pip install -r requirements.txt
```

### **3️⃣ Run the Application**  
If running with Flask:  
```bash
python app.py
```
Then open [http://127.0.0.1:5000](http://127.0.0.1:5000) in a browser.

---

## **📁 Supported File Formats**  
### **1️⃣ JSON Format**
```json
{
  "nodes": [
    {"id": "A"},
    {"id": "B"},
    {"id": "C"}
  ],
  "edges": [
    {"source": "A", "target": "B"},
    {"source": "B", "target": "C"}
  ]
}
```

### **2️⃣ CSV Format**
```
source,target
A,B
B,C
```

---

## **🚀 How It Works**
1. **Upload a CSV/JSON file** → The network graph is generated.
2. **Extract a subgraph** by entering a node ID → It highlights its **first-degree neighbors**.
3. **Choose different layouts** to rearrange the graph.
4. **Error Handling**: Displays messages for **invalid formats or missing nodes**.

---

## **🎯 Deployment**
### **Option 1: GitHub Pages (Frontend Only)**
1. Push the repo to GitHub.
2. Enable GitHub Pages in **Settings → Pages**.
3. Your site will be available at `https://your-username.github.io/network-graph-viewer/`.

### **Option 2: Render (Full Stack)**
1. Push code to **GitHub**.
2. Sign up on [Render](https://render.com) → New Web Service.
3. Connect repo → Set start command:  
   ```
   gunicorn app:app
   ```
4. Deploy → Your site is live!

---

## **🙌 Contributing**
1. Fork the repository  
2. Create a new branch: `git checkout -b feature-name`  
3. Commit changes: `git commit -m "Added feature"`  
4. Push and create a Pull Request  

---

## **📜 License**
This project is **open-source** under the **MIT License**.

