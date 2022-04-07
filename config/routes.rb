Rails.application.routes.draw do
  root 'static_pages#login'

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/sign_out', to: 'sessions#destroy'

  get '/dashboard', to: 'landing_page#dashboard'
end
