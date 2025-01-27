<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title>
        Export Products
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-select
          v-model="exportFormat"
          :items="exportFormats"
          label="Select Format"
          outlined
          dense
        ></v-select>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn color="primary" :loading="isExporting" @click="exportData">
          Export
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default {
  name: "ExportDialog",
  props: {
    tableData: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    isExporting: false,
    exportFormat: "xlsx",
    exportFormats: [
      { text: "Excel (XLSX)", value: "xlsx" },
      { text: "CSV", value: "csv" },
      { text: "PDF", value: "pdf" },
    ],
  }),

  methods: {
    show() {
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.exportFormat = "xlsx";
    },

    prepareData(data) {
      return data.map((item) => ({
        "Product Code": item.productCode,
        Name: item.name,
        Brand: item.brand?.name || "-",
        Category: item.category?.name || "-",
        Stock: item.availableStocks,
        Type: item.type,
      }));
    },

    async exportData() {
      try {
        this.isExporting = true;
        const formattedData = this.prepareData(this.tableData);

        switch (this.exportFormat) {
          case "xlsx":
            await this.exportToExcel(formattedData);
            break;
          case "csv":
            await this.exportToCsv(formattedData);
            break;
          case "pdf":
            await this.exportToPdf(formattedData);
            break;
        }

        this.$emit("success", "Export completed successfully");
        this.close();
      } catch (error) {
        this.$emit("error", "Export failed");
        console.error("Export error:", error);
      } finally {
        this.isExporting = false;
      }
    },

    exportToExcel(data) {
      const worksheet = utils.json_to_sheet(data);

      const colWidths = [
        { wch: 15 },
        { wch: 30 },
        { wch: 15 },
        { wch: 15 },
        { wch: 10 },
        { wch: 10 },
      ];
      worksheet["!cols"] = colWidths;

      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Products");
      writeFile(
        workbook,
        `products_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    },

    exportToCsv(data) {
      const headers = Object.keys(data[0]).join(",");
      const rows = data.map((item) => Object.values(item).join(","));
      const csv = [headers, ...rows].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `products_${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
    },

    exportToPdf(data) {
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text("Products Report", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      doc.autoTable({
        startY: 30,
        head: [Object.keys(data[0])],
        body: data.map((item) => Object.values(item)),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [71, 71, 71] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { top: 30 },
      });

      doc.save(`products_${new Date().toISOString().split("T")[0]}.pdf`);
    },
  },
};
</script>
