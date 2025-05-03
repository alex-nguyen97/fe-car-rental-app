import axios from 'axios';
// const apiUrl = import.meta.env.VITE_API_URL;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URl;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
import { createClient } from '@supabase/supabase-js';

// const api = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

const supabase = createClient(supabaseUrl, supabaseKey);

// Export the api instance for use in other parts of the app
export default supabase;
