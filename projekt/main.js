import './style.css'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vobutlvkzvsmhupksube.supabase.co'
const supabaseKey = 'sb_publishable_SDh3fS-FphMl190vDL-bFA_qFci1OlL'
const supabase = createClient(supabaseUrl, supabaseKey)

const articlesList = document.getElementById('articles-list')
const form = document.getElementById('add-article-form')

async function fetchArticles() {
  const { data, error } = await supabase
    .from('article')
    .select('*')

  if (error) {
    console.error('Błąd pobierania danych:', error)
    return
  }

  articlesList.innerHTML = ''
  
  data.forEach(article => {
    const articleDate = article.created_at ? new Date(article.created_at).toLocaleDateString('pl-PL') : 'Brak daty'

    const div = document.createElement('div')
    div.className = 'border p-4 rounded shadow bg-white'
    div.innerHTML = `
      <h2 class="text-xl font-semibold">${article.title}</h2>
      <h3 class="text-gray-600">${article.subtitle}</h3>
      <p class="text-sm text-gray-400 mt-1">Autor: ${article.author} | Data: ${articleDate}</p>
      <p class="mt-4">${article.content}</p>
    `
    articlesList.appendChild(div)
  })
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const title = document.getElementById('title').value
  const subtitle = document.getElementById('subtitle').value
  const author = document.getElementById('author').value
  const content = document.getElementById('content').value

  const { error } = await supabase
    .from('article') 
    .insert([{ title, subtitle, author, content }])

  if (error) {
    console.error('Błąd dodawania artykułu:', error)
  } else {
    form.reset()
    fetchArticles()
  }
})

fetchArticles()