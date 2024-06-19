//
//  ModuleListView.swift
//  ModReview
//
//  Created by Jai Lulla on 31/5/24.
//

import SwiftUI

struct ModuleListView: View {
    @State private var data: [Module] = []

    var body: some View {
         NavigationView {
             List(data, id: \.id) { mod in
                 NavigationLink(destination: ModuleDetailView(module: mod)) {
                     VStack(alignment: .leading) {
                         Text(mod.code)
                         Text(mod.name)
                             .font(.subheadline)
                             .foregroundColor(.secondary)
                     }
                 }
             }
             .onAppear {
                 fetchData()
             }
             .navigationTitle("Modules")
         }
     }

    func fetchData() {
        guard let url = URL(string: "http://localhost:3005/api/module_service/modules") else { return }

        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data else { return }
            do {
                let mods = try JSONDecoder().decode([Module].self, from: data)
                DispatchQueue.main.async {
                    self.data = mods
                }
            } catch {
                print(error.localizedDescription)
            }
        }.resume()
    }
}

struct Module: Codable {
    let id: Int
    let name: String
    let code: String
}

#Preview {
    ModuleListView()
}

