//
//  ModuleDetailView.swift
//  ModReview
//
//  Created by Jai Lulla on 31/5/24.
//

import SwiftUI

struct ModuleDetailView: View {
    var module: Module
    @State private var data: [Review] = []

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(module.code)
                .font(.title)
            Text(module.name)
                .font(.title2)
            
            if data.isEmpty {
                Text("No reviews yet...")
                    .font(.body)
                    .foregroundColor(.gray)
            } else {
                ForEach(data, id: \.id) { review in
                    VStack(alignment: .leading, spacing: 5) {
                        Text("Rating: \(review.rating)")
                            .font(.headline)
                        Text(review.review)
                            .font(.body)
                    }
                    .padding(.bottom, 10)
                }
            }

            Spacer()
        }
        .padding()
        .navigationTitle("Module Review")
        .onAppear {
            fetchData()
        }
    }
    
    func fetchData() {
        guard let url = URL(string: "http://localhost:3005/api/review_service/reviews/module/" + String(module.id)) else { return }

        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data else { return }
            do {
                let reviews = try JSONDecoder().decode([Review].self, from: data)
                DispatchQueue.main.async {
                    self.data = reviews
                }
            } catch {
                print(error.localizedDescription)
            }
        }.resume()
    }
}

struct Review: Codable {
    let id: Int
    let review: String
    let rating: Int
    let moduleId: Int
}

