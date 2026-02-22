export interface ApiConfig {
  // Fetch items endpoint
  fetchUrl?: string;
  fetchMethod?: 'GET' | 'POST';
  fetchBody?: any;

  // Switch/Change item endpoint
  switchUrl?: string;
  switchMethod?: 'POST' | 'PUT' | 'PATCH';
  switchBodyKey?: string; // Key to send item id (e.g., 'facility_id', 'period_id')

  // Response data path (e.g., 'data', 'result.items')
  dataPath?: string;

  // Error messages
  fetchErrorMessage?: string;
  switchErrorMessage?: string;
  switchSuccessMessage?: string;
}
