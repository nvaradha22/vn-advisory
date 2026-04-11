import matplotlib.pyplot as plt
import networkx as nx
from matplotlib.animation import FuncAnimation
import numpy as np

# Graph setup
G = nx.DiGraph()

nodes = ["Data", "Scout", "Analyst", "Decision", "Execution"]
edges = [
    ("Data", "Scout"),
    ("Scout", "Analyst"),
    ("Analyst", "Decision"),
    ("Decision", "Execution")
]

G.add_nodes_from(nodes)
G.add_edges_from(edges)

# Positions
pos = {
    "Data": (0, 0),
    "Scout": (1, 1),
    "Analyst": (2, 0),
    "Decision": (3, 1),
    "Execution": (4, 0)
}

# Create figure
fig, ax = plt.subplots(figsize=(10, 5))

# Generate flow particles
particles = []
for edge in edges:
    start = np.array(pos[edge[0]])
    end = np.array(pos[edge[1]])
    for i in np.linspace(0, 1, 20):
        point = start + (end - start) * i
        particles.append(point)

particles = np.array(particles)

# Animation function
def update(frame):
    ax.clear()

    # Background
    fig.patch.set_facecolor("#0b0f14")
    ax.set_facecolor("#0b0f14")

    # Draw nodes
    nx.draw_networkx_nodes(
        G, pos,
        node_size=3000,
        node_color="#4da6ff",
        ax=ax
    )

    # Draw labels
    nx.draw_networkx_labels(
        G, pos,
        font_size=10,
        font_color="white",
        ax=ax
    )

    # Draw edges (static base)
    nx.draw_networkx_edges(
        G,
        pos,
        width=1,
        edge_color="gray",
        arrows=True,
        ax=ax
    )

    # Animate flowing particles
    shift = frame % len(particles)
    animated_particles = np.roll(particles, shift, axis=0)

    ax.scatter(
        animated_particles[:, 0],
        animated_particles[:, 1],
        s=20,
        color="cyan"
    )

    # Title
    ax.set_title("AI Agent Execution Flow", color="white", fontsize=14)

    ax.axis("off")

# Animation
ani = FuncAnimation(
    fig,
    update,
    frames=100,
    interval=100,
    repeat=True
)

# Save as high-quality GIF
ani.save("agent-animation-pro.gif", writer="pillow", fps=10)

print("High-quality animation created: agent-animation-pro.gif")