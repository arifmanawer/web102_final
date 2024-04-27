
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hnxngfulsnsmvhsatiij.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhueG5nZnVsc25zbXZoc2F0aWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzM5NDcsImV4cCI6MjAyOTY0OTk0N30.tusZXdC3xYUiOzlndDXqwEXmotk0t2YhtKW6sFTCv9A"
export const supabase = createClient(supabaseUrl, supabaseKey)