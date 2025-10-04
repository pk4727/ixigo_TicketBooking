import * as XLSX from 'xlsx';

export function getExcelData(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
}