Rails.application.routes.draw do
  root 'static_pages#login'

  get '/auth/:provider/callback', to: 'sessions#create'
end
