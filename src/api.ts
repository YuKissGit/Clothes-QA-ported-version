import { invoke } from "@tauri-apps/api/core";
import type {
  Batch,
  Brand,
  Carton,
  CartonProduct,
  ImportResult,
  RecordInput,
  RecordRow,
  ReplaceCartonRecordsInput,
} from "./types";
import type { PhotoInput } from "./types";

export const api = {
  listBatches: () => invoke<Batch[]>("list_batches"),
  createBatch: (input: Omit<Batch, "id">) =>
    invoke<number>("create_batch", { input }),
  deleteBatch: (id: number) => invoke<void>("delete_batch", { id }),
  listBrands: (batchId: number) => invoke<Brand[]>("list_brands", { batchId }),
  createBrand: (batchId: number, name: string) => invoke<number>("create_brand", { batchId, name }),
  renameBrand: (id: number, name: string) => invoke<void>("rename_brand", { id, name }),
  deleteBrand: (id: number) => invoke<void>("delete_brand", { id }),
  listCartons: (batchId: number, brandId?: number) =>
    invoke<Carton[]>("list_cartons", { batchId, brandId: brandId ?? null }),
  listCartonProducts: (cartonId: number) =>
    invoke<CartonProduct[]>("list_carton_products", { cartonId }),
  createCarton: (batchId: number, brandId: number, cartonNo: string) =>
    invoke<number>("create_carton", { batchId, brandId, cartonNo }),
  renameCarton: (id: number, cartonNo: string) =>
    invoke<void>("rename_carton", { id, cartonNo }),
  updateCartonInspector: (id: number, inspector: string) =>
    invoke<void>("update_carton_inspector", { id, inspector }),
  deleteCarton: (id: number) => invoke<void>("delete_carton", { id }),
  importCartons: (batchId: number, brandId: number, path: string) =>
    invoke<ImportResult>("import_cartons", { batchId, brandId, path }),
  exportCartonTemplate: (path: string) =>
    invoke<string>("export_carton_template", { path }),
  listRecords: (batchId: number, cartonId: number) =>
    invoke<RecordRow[]>("list_records", { batchId, cartonId }),
  createRecord: (input: RecordInput) =>
    invoke<number>("create_record", { input }),
  replaceCartonRecords: (input: ReplaceCartonRecordsInput) =>
    invoke<void>("replace_carton_records", { input }),
  listRecordPhotos: (recordId: number) =>
    invoke<PhotoInput[]>("list_record_photos", { recordId }),
  completeCarton: (id: number) => invoke<void>("complete_carton", { id }),
  reopenCarton: (id: number) => invoke<void>("reopen_carton", { id }),
  readClipboardFileImage: () =>
    invoke<PhotoInput | null>("read_clipboard_file_image"),
  exportBatch: (batchId: number, outputDir: string) =>
    invoke<string[]>("export_batch", { batchId, outputDir }),
  exportBrand: (batchId: number, brandId: number, outputDir: string) =>
    invoke<string[]>("export_brand", { batchId, brandId, outputDir }),
};
