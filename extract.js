const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data_dump.json', 'utf8'));

// 4. Current Product Catalogue
let catalogMD = `| Product Name | Slug | Category | Short Description | Material | Colours | Intended Use | Approximate Style | Current Status |\n`;
catalogMD += `|---|---|---|---|---|---|---|---|---|\n`;

let allMaterials = new Set();
let productImages = 0; // count to just know

const categories = data.productCategories || [];
categories.forEach(cat => {
  if (cat.products) {
    cat.products.forEach(prod => {
      // Collect materials
      if (prod.materials) {
        prod.materials.forEach(m => allMaterials.add(m));
      }
      
      const name = prod.name || '';
      const slug = prod.slug || '';
      const category = cat.name || '';
      const desc = (prod.description || '').replace(/\n/g, ' ');
      const materials = (prod.materials || []).join(', ');
      const colors = (prod.colors || []).join(', ');
      const goodFor = (prod.goodFor || []).join(', ');
      const style = prod.label || '';
      const status = prod.image && prod.image.includes('placeholder') ? 'Placeholder Images' : 'Final';
      
      catalogMD += `| ${name} | ${slug} | ${category} | ${desc} | ${materials} | ${colors} | ${goodFor} | ${style} | ${status} |\n`;
    });
  }
});

// 7. Materials Used
let materialsMD = `\n### Materials Found:\n`;
Array.from(allMaterials).forEach(m => {
  materialsMD += `- ${m}\n`;
});

// 5. Categories
let categoriesMD = `\n### Collections & Categories:\n`;
categories.forEach(cat => {
  categoriesMD += `- **${cat.name}**: ${cat.description}\n`;
});
if (data.fandomCollections) {
  categoriesMD += `\n**Fandom Collections:**\n`;
  data.fandomCollections.forEach(fc => {
    categoriesMD += `- ${fc.name}: ${fc.fandoms ? fc.fandoms.join(', ') : ''}\n`;
  });
}

const output = catalogMD + '\n' + materialsMD + '\n' + categoriesMD;
fs.writeFileSync('extracted_catalog.md', output);
console.log("Extraction complete.");
