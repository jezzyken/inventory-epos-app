<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title>
        Print Products
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-select
          v-model="printFormat"
          :items="printFormats"
          label="Print Layout"
          outlined
          dense
        ></v-select>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn color="primary" :loading="isPrinting" @click="printData">
          Print
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PrintDialog",
  props: {
    tableData: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    isPrinting: false,
    printFormat: "detailed",
    printFormats: [
      { text: "Detailed View", value: "detailed" },
      { text: "Compact View", value: "compact" },
    ],
  }),

  methods: {
    show() {
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.printFormat = "detailed";
    },

    async printData() {
      try {
        this.isPrinting = true;
        const data = this.tableData;

        const printContent = this.generatePrintContent(data);

        const printWindow = window.open("", "_blank");
        printWindow.document.write(printContent);
        printWindow.document.close();

        setTimeout(() => {
          printWindow.print();
          setTimeout(() => printWindow.close(), 1000);
        }, 500);

        this.$emit("success", "Print job sent successfully");
        this.close();
      } catch (error) {
        this.$emit("error", "Print failed");
        console.error("Print error:", error);
      } finally {
        this.isPrinting = false;
      }
    },

    generatePrintContent(data) {
      const style = `
        <style>
          @page { margin: 1cm; }
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          h2 { color: #333; }
          .report-meta { margin-bottom: 20px; color: #666; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f5f5f5; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          img { max-width: 40px; max-height: 40px; object-fit: contain; }
          @media print {
            body { margin: 0; padding: 20px; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            thead { display: table-header-group; }
          }
        </style>
      `;

      const tableContent =
        this.printFormat === "detailed"
          ? this.generateDetailedTable(data)
          : this.generateCompactTable(data);

      return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Products Report</title>
            ${style}
          </head>
          <body>
            <h2>Products Report</h2>
            <div class="report-meta">
              Generated on: ${new Date().toLocaleString()}
              <br>
              Total Products: ${data.length}
            </div>
            ${tableContent}
          </body>
        </html>
      `;
    },

    generateDetailedTable(data) {
      let tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Code</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach((item) => {
        tableHTML += `
          <tr>
            <td>
              <img src="${item.image}" alt="${
          item.name
        }" onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='">
            </td>
            <td>${item.productCode}</td>
            <td>${item.name}</td>
            <td>${item.brand?.name || "-"}</td>
            <td>${item.category?.name || "-"}</td>
            <td>${item.availableStocks}</td>
            <td>${item.type}</td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      return tableHTML;
    },

    generateCompactTable(data) {
      let tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach((item) => {
        tableHTML += `
          <tr>
            <td>${item.productCode}</td>
            <td>${item.name}</td>
            <td>${item.availableStocks}</td>
            <td>${item.type}</td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      return tableHTML;
    },
  },
};
</script>
