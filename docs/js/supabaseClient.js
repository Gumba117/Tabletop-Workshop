
/*
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://selrdrxvnhmoauacdoap.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbHJkcnh2bmhtb2F1YWNkb2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMDgwMjQsImV4cCI6MjA2MTg4NDAyNH0.ocgmf2Eli_losg8gBEinigt5sSfRGpF2aX7uEDX1Oa8'
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = { supabase }
*/

// js/supabaseClient.js
/*
const { createClient } = supabase;
const SUPABASE_URL = 'https://selrdrxvnhmoauacdoap.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbHJkcnh2bmhtb2F1YWNkb2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMDgwMjQsImV4cCI6MjA2MTg4NDAyNH0.ocgmf2Eli_losg8gBEinigt5sSfRGpF2aX7uEDX1Oa8';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
*/

// ==============================
// Configuración del cliente Supabase
// ==============================

// 👉 Reemplaza con los valores reales de tu proyecto Supabase
const SUPABASE_URL = 'https://selrdrxvnhmoauacdoap.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbHJkcnh2bmhtb2F1YWNkb2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMDgwMjQsImV4cCI6MjA2MTg4NDAyNH0.ocgmf2Eli_losg8gBEinigt5sSfRGpF2aX7uEDX1Oa8';

// Creamos una instancia del cliente Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exportamos el cliente para poder usarlo en otros archivos
window.supabase = supabase;
