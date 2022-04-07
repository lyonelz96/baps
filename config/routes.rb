Rails.application.routes.draw do
  root 'static_pages#login'

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/sign_out', to: 'sessions#destroy'

  get '/user/:uid', to: 'landing_page#dashboard', as: 'dashboard'
end
