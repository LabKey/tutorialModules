png(filename="${imgout:a}", width=900);
plot(labkey.data$x, labkey.data$starter1, type = "b", frame = FALSE, col = "red", xlab = "time elapsed (hrs)", ylab = "volume increase (%)");
lines(labkey.data$x, labkey.data$starter2, col = "blue", type = "b");
lines(labkey.data$x, labkey.data$starter3, col = "green", type = "b");
legend(1, 400, legend=c("starter1", "starter2", "starter3"), fill = c("red", "blue", "green"));
dev.off();
